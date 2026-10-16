/* ProSourced: hero finder + free business tools. Everything runs in the browser; nothing is sent anywhere. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var num = function (el) { var v = parseFloat(String(el && el.value || '').replace(/[^0-9.\-]/g, '')); return isFinite(v) ? v : 0; };
  var params = new URLSearchParams(location.search);

  function money(n, cur) {
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(n); }
    catch (e) { return cur + ' ' + Math.round(n).toLocaleString(); }
  }

  /* Hero finder: service + region → that service page (works as a plain form without JS) */
  var finder = $('[data-finder]');
  if (finder) finder.addEventListener('submit', function (e) {
    var s = finder.elements.service.value, r = finder.elements.region.value;
    if (!s) return;
    e.preventDefault();
    try { sessionStorage.setItem('ps-region', r); } catch (x) { /* storage blocked */ }
    location.href = '/' + s + '/' + (r ? '?region=' + encodeURIComponent(r) : '');
  });

  /* 1. In-house vs outsourcing cost calculator */
  var cost = $('[data-tool="cost"]');
  if (cost) {
    var f = cost.querySelector('form'), out = $('[data-result]', cost);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var cur = f.currency.value, salary = num(f.salary), oncost = num(f.oncost), overhead = num(f.overhead), hire = num(f.hire),
        hours = num(f.hours), rate = num(f.rate), retainer = num(f.retainer), fte = num(f.fte) || 1;
      if (!salary && !rate && !retainer) { out.hidden = false; out.innerHTML = '<p class="result-note">Enter a salary for the in-house option and an hourly rate or monthly fee for the outsourced option.</p>'; return; }
      var inhouse = (salary * (1 + oncost / 100) + overhead) * fte + hire;
      var outsourced = retainer ? retainer * 12 : rate * hours * 12;
      var diff = inhouse - outsourced;
      var breakEven = rate ? (inhouse / 12) / rate : 0;
      var cheaper = diff > 0 ? 'Outsourcing' : diff < 0 ? 'In-house' : 'Neither';
      out.hidden = false;
      out.innerHTML = '<h3>Your first-year estimate</h3><div class="result-grid">' +
        '<div class="stat' + (diff < 0 ? ' win' : '') + '"><span>In-house (first year)</span><strong>' + money(inhouse, cur) + '</strong></div>' +
        '<div class="stat' + (diff > 0 ? ' win' : '') + '"><span>Outsourced (12 months)</span><strong>' + money(outsourced, cur) + '</strong></div>' +
        '<div class="stat"><span>' + (diff ? cheaper + ' is cheaper by' : 'Difference') + '</span><strong>' + money(Math.abs(diff), cur) + '</strong></div>' +
        (breakEven ? '<div class="stat"><span>Break-even outsourced hours</span><strong>' + Math.round(breakEven) + ' h / month</strong></div>' : '') +
        '</div><p class="result-note">Based only on the figures you entered. Recruitment cost is counted once, in year one. Costs also aren’t the whole picture: think about control, availability, specialist skills and how fast you need to scale. Then <a href="/free-tools/project-brief-builder/">write a brief</a> and compare quotes.</p>';
    });
  }

  /* 2. Project brief builder */
  var brief = $('[data-tool="brief"]');
  if (brief) {
    var bf = brief.querySelector('form'), box = $('[data-result]', brief), pre = $('.brief-out', brief), status = $('.tool-status', brief);
    var svc = params.get('service');
    if (svc && bf.service.querySelector('option[value="' + svc.replace(/"/g, '') + '"]')) bf.service.value = svc;
    var reg = params.get('region'); try { reg = reg || sessionStorage.getItem('ps-region'); } catch (x) { /* storage blocked */ }
    if (reg && !bf.country.value) bf.country.value = ({ us: 'United States', uk: 'United Kingdom', eu: 'European Union', ca: 'Canada', au: 'Australia', in: 'India', ae: 'United Arab Emirates', sg: 'Singapore' })[reg] || '';
    var text = '';
    bf.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (k) { return (bf[k].value || '').trim(); };
      var sv = bf.service.options[bf.service.selectedIndex].text;
      var lines = [
        'PROJECT BRIEF: ' + (sv || 'Professional services'),
        '',
        'About us: ' + (v('business') || '[business name and what you do]') + (v('country') ? ' (based in ' + v('country') + ')' : ''),
        v('size') ? 'Team size: ' + v('size') : '',
        '',
        'What we need:', v('need') || '[describe the work]',
        '',
        'What success looks like:', v('goals') || '[the outcome you want]',
        '',
        'Deliverables:', v('deliverables') || '[what you expect to receive]',
        '',
        'Budget: ' + (v('budget') || 'Open to proposals'),
        'Timing: ' + (v('deadline') || 'Flexible'),
        'Working style: ' + v('mode'),
        v('languages') ? 'Languages / time zones: ' + v('languages') : '',
        '',
        'Please include in your reply:',
        '- Relevant experience and two or three examples or references',
        '- Your qualifications, registrations or certifications (where relevant)',
        '- Your proposed approach and timeline',
        '- A clear price (fixed fee, hourly or day rate, or retainer) and what it includes',
        '- Your insurance cover and how you protect our data',
      ];
      text = lines.filter(function (l, i, a) { return l !== '' || a[i - 1] !== ''; }).join('\n');
      pre.textContent = text;
      box.hidden = false;
      status.textContent = '';
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    $('[data-copy]', brief).addEventListener('click', function () {
      var done = function () { status.textContent = 'Copied. Paste it into your quote request or email.'; };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { status.textContent = 'Select the text above and copy it.'; });
      else status.textContent = 'Select the text above and copy it.';
    });
    $('[data-download]', brief).addEventListener('click', function () {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
      a.download = 'project-brief.txt';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    $('[data-email]', brief).addEventListener('click', function () {
      location.href = 'mailto:?subject=' + encodeURIComponent('Project brief: ' + bf.service.options[bf.service.selectedIndex].text) + '&body=' + encodeURIComponent(text);
    });
  }

  /* 3. Hourly and day rate calculator (for professionals and freelancers) */
  var rate = $('[data-tool="rate"]');
  if (rate) {
    var rf = rate.querySelector('form'), ro = $('[data-result]', rate);
    rf.addEventListener('submit', function (e) {
      e.preventDefault();
      var cur = rf.currency.value, income = num(rf.income), costs = num(rf.costs), tax = Math.min(num(rf.tax), 90),
        weeks = Math.max(0, 52 - num(rf.weeksoff)), billable = num(rf.billable), day = num(rf.daylength) || 8;
      var hoursYear = weeks * billable;
      if (!income || !hoursYear) { ro.hidden = false; ro.innerHTML = '<p class="result-note">Enter your target income and how many hours a week you can bill.</p>'; return; }
      var needed = (income / (1 - tax / 100)) + costs;
      var hourly = needed / hoursYear;
      ro.hidden = false;
      ro.innerHTML = '<h3>Your minimum rates</h3><div class="result-grid">' +
        '<div class="stat win"><span>Hourly rate</span><strong>' + money(hourly, cur) + '</strong></div>' +
        '<div class="stat"><span>Day rate (' + day + ' h)</span><strong>' + money(hourly * day, cur) + '</strong></div>' +
        '<div class="stat"><span>Revenue needed per year</span><strong>' + money(needed, cur) + '</strong></div>' +
        '<div class="stat"><span>Billable hours per year</span><strong>' + Math.round(hoursYear).toLocaleString() + '</strong></div>' +
        '</div><p class="result-note">This is the floor that covers your target take-home pay, the tax rate you entered and your business costs. Your market rate also depends on your specialism, track record and the clients you serve.</p>';
    });
  }
})();
