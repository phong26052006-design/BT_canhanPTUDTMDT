/* Read-only extraction from Moodle course markup, independent of the UI. */
(function (global, $) {
    'use strict';
    const sectionSelector = '.course-section, li.section, section.section, [data-for="section"], [data-region="course-section"]';
    const assignmentSelector = '.modtype_assign, [data-modname="assign"], [data-moduletype="assign"]';
    const clean = text => text.replace(/\s+/g, ' ').trim();

    function deadline($activity) {
        const explicit = $activity.find('[data-due-date], [data-duedate], time[data-eventtype="due"]').first();
        if (explicit.length) {
            const value = explicit.attr('datetime') || explicit.attr('data-due-date') || explicit.attr('data-duedate') || clean(explicit.text());
            if (/^\d{10}$|^\d{13}$/.test(value)) {
                const ms = value.length === 10 ? Number(value) * 1000 : Number(value);
                return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Ho_Chi_Minh' }).format(ms);
            }
            if (value) return value;
        }
        const pattern = /^(?:hạn (?:nộp(?: bài)?|chót)|đến hạn|due(?: date)?|deadline)\s*[:：]\s*(.+)/i;
        const rows = $activity.find('[data-region="activity-dates"] > div, .activity-dates > div, .activity-dates li, .description .availabilityinfo');
        for (const row of rows) {
            const match = clean($(row).text()).match(pattern);
            if (match?.[1]) return match[1];
        }
        // A container can hold a single inline date instead of separate rows.
        const inline = $activity.find('[data-region="activity-dates"], .activity-dates')
            .filter((_, node) => !node.querySelector('div, li, br'));
        for (const row of inline) {
            const match = clean($(row).text()).match(pattern);
            if (match?.[1]) return match[1];
        }
        return 'Không hiển thị trên trang nguồn';
    }

    function extract(root) {
        const $root = $(root);
        const modules = [];
        $root.find(assignmentSelector).each(function () {
            const $activity = $(this);
            if ($activity.parents(assignmentSelector).length) return;
            const $name = $activity.find('.instancename, [data-region="activity-name"], .activityname a').first().clone();
            $name.find('.accesshide, .sr-only, .visually-hidden').remove();
            const name = clean($name.text());
            if (name) modules.push({ node: this, name, deadline: deadline($activity) });
        });
        const sections = [];
        const seen = new Set();
        $root.find(sectionSelector).each(function () {
            const $section = $(this);
            const heading = $section.find('.sectionname, [data-for="section_title"], .course-section-header h2, h3.section-title, h3.sectionname').filter(function () {
                return $(this).closest(sectionSelector)[0] === $section[0];
            }).first();
            if (!heading.length) return;
            const name = clean(heading.text());
            if (!name) return;
            const items = modules.filter(item => $(item.node).closest(sectionSelector)[0] === this);
            items.forEach(item => seen.add(item));
            sections.push({ name, assignments: items.map(({ name, deadline }) => ({ name, deadline })) });
        });
        const ungrouped = modules.filter(item => !seen.has(item));
        if (ungrouped.length) sections.push({ name: 'Chưa xác định chủ đề', assignments: ungrouped.map(({ name, deadline }) => ({ name, deadline })) });
        const fifth = modules[4];
        return { sections, total: modules.length, fifth: fifth ? { name: fifth.name, deadline: fifth.deadline } : null };
    }

    global.readCourseAssignments = extract;
    const $rows = $('#lms-rows');
    if (!$rows.length) return;
    const makeDemoSection = (title, activities) => `<section class="course-section"><h3 class="sectionname">${title}</h3>${activities.map(([name, date]) => `<div class="modtype_assign"><span class="instancename">${name}<span class="accesshide"> Bài tập</span></span><div class="activity-dates"><div>Mở bài: 1 tháng 11 năm 2026</div>${date ? `<div>Hạn nộp: ${date}</div>` : ''}</div></div>`).join('')}</section>`;
    const demo = [
        ['Tài liệu tham khảo', []],
        ['HTML và CSS', [['Khởi tạo trang HTML', '8 tháng 11 năm 2026'], ['Bố cục CSS cơ bản', '11 tháng 11 năm 2026']]],
        ['JavaScript', [['JavaScript nền tảng', '13 tháng 11 năm 2026'], ['Thực hành DOM', '15 tháng 11 năm 2026']]],
        ['Advanced Front End', [['Bài cá nhân Advanced Front End', '24 tháng 11 năm 2026'], ['Bổ sung ảnh minh chứng', '']]],
    ];

    function render(markup, source) {
        const template = document.createElement('template');
        template.innerHTML = markup;
        const report = extract(template.content);
        $('#source-note').text(`${source} · ${report.sections.length} chủ đề · ${report.total} bài tập`);
        $('#fifth').text(report.fifth ? `Bài tập thứ năm: ${report.fifth.name} · ${report.fifth.deadline}` : 'Trang nguồn có ít hơn 5 bài tập nhận diện được.');
        $rows.empty();
        for (const topic of report.sections) {
            const $row = $('<tr>');
            $('<th scope="row">').text(topic.name).appendTo($row);
            $('<td>').text(topic.assignments.length ? `Có · ${topic.assignments.length}` : 'Không có').appendTo($row);
            const $cell = $('<td>').appendTo($row);
            if (topic.assignments.length) {
                const $list = $('<ul>').appendTo($cell);
                for (const assignment of topic.assignments) $('<li>').text(`${assignment.name} — ${assignment.deadline}`).appendTo($list);
            } else $cell.text('—');
            $row.appendTo($rows);
        }
        $('#lms-output').prop('hidden', false);
        if (!report.sections.length && !report.total) $('#source-note').append(' · Chưa nhận diện được cấu trúc khóa học. Kiểm tra tệp đã lưu từ trang môn học.');
    }

    let requestId = 0;
    $('#sample-lms').on('click', () => {
        requestId++;
        render(demo.map(([title, activities]) => makeDemoSection(title, activities)).join(''), 'Dữ liệu mô phỏng');
    });
    $('#read-lms').on('click', async () => {
        const currentRequest = ++requestId;
        const file = $('#lms-file')[0].files[0];
        const pasted = $('#lms-markup').val().trim();
        try {
            if (!pasted && !file) throw new Error('Chọn tệp HTML hoặc dán HTML trước khi phân tích.');
            const bytes = pasted ? new Blob([pasted]).size : file.size;
            if (bytes > 10_000_000) throw new Error('Dữ liệu HTML tối đa 10 MB.');
            const markup = pasted || await file.text();
            if (currentRequest === requestId) render(markup, 'HTML do người dùng cung cấp');
        } catch (error) {
            if (currentRequest !== requestId) return;
            $('#lms-output').prop('hidden', true);
            $('#source-note').text(error.message);
        }
    });
})(window, window.jQuery);
