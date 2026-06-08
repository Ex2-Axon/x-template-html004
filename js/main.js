window.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initStarfield(80);
    selectLandmark('defensive');
    setMoonPhase('full');
    renderMemories();
    checkZodiacCompatibility();
});

function initStarfield(count = 80) {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    starfield.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = Math.random();
        star.style.animationDelay = `${Math.random() * 5}s`;
        starfield.appendChild(star);
    }
}

const landmarks = {
    defensive: {
        title: "ป้อมปราการเปลือกปู (The Defensive Shield)",
        trait: "สร้างเกราะป้องกัน (Defensive) เหมือนเปลือกแข็งของปู",
        icon: "shield",
        colorClass: "bg-sky-950/60 border border-sky-400/30",
        visual: "[รูปจำลองป้อมปราการหินสีนวลจันทร์ซ้อนทับกันหลายชั้นคล้ายกระดองปู]",
        desc: "เป็นแนวกำแพงหินชั้นนอกที่แข็งแกร่งที่สุด สูงตระหง่าน และเข้าถึงได้ยากสำหรับคนแปลกหน้า เพื่อสะท้อนถึงนิสัยดั้งเดิมของชาวกรกฎที่มีความระแวดระวังตัวสูง มีความขี้อายและจะพยายามป้องกันตนเองก่อนในก้าวแรกจนกว่าจะรู้สึกมั่นใจในความปลอดภัยและเคารพต่อผู้อื่น"
    },
    family: {
        title: "มหาวิหารแห่งบ้าน (The Hearth Sanctuary)",
        trait: "รักครอบครัวและบ้าน (Family-Oriented) ความปลอดภัยอันอบอุ่น",
        icon: "home",
        colorClass: "bg-emerald-950/60 border border-emerald-400/30",
        visual: "[รูปวิหารทรงกลมกึ่งบ้านที่มีเตาผิงยักษ์กลางลานเมือง โคมไฟส่องสว่างสีอุ่นอบอวล]",
        desc: "แลนด์มาร์กสำคัญที่สุดที่ตั้งเด่นใจกลางเมือง สื่อถึงสัญชาตญาณของการใส่ใจดูแลคนรอบข้างดั่งคนในครอบครัว มีเตาผิงและโถงรับรองขนาดยักษ์คอยรักษาอุณหภูมิให้อบอุ่นเสมอ เพื่อเปิดพื้นที่ให้สมาชิกในเมืองและผู้มาเยือนได้ผ่อนคลายและสัมผัสความอบอุ่นแบบครอบครัวที่ปลอดภัย"
    },
    sensitive: {
        title: "ทะเลสาบจันทรา (The Emotional Lagoon)",
        trait: "อารมณ์อ่อนไหว ลึกซึ้ง และมีสัญชาตญาณที่แปรปรวน (Sensitive)",
        icon: "waves",
        colorClass: "bg-blue-950/60 border border-blue-400/30",
        visual: "[รูปผืนน้ำใสกระจ่างสีครามสะท้อนดวงจันทร์ คลื่นพลิ้วสั่นสะเทือนตลอดเวลา]",
        desc: "ทะเลสาบศักดิ์สิทธิ์ใจกลางเมืองที่ระดับน้ำ คลื่น และสีสันของน้ำจะเปลี่ยนแปรอย่างรวดเร็ว สะท้อนอารมณ์และความรู้สึกที่เข้าใจง่ายแต่ลึกซึ้งของคนราศีกรกฎ ทะเลสาบนี้เปรียบดั่งเซ็นเซอร์รับรู้ความรู้สึกของแขกที่ก้าวเข้าเมือง ได้อย่างเฉียบแหลมยิ่งยวด"
    },
    nostalgic: {
        title: "หอจดหมายเหตุอดีต (The Nostalgia Vault)",
        trait: "จดจำเรื่องราวโบราณและอดีตฝังใจเก่ง (Nostalgic)",
        icon: "archive",
        colorClass: "bg-amber-950/60 border border-amber-400/30",
        visual: "[รูปหอคอยห้องสมุดเก่าแก่ ชั้นวางของโบราณเก็บของจุกจิกนับแสนชิ้นและนาฬิกาทราย]",
        desc: "สถาปัตยกรรมหอคอยสูงอันเป็นที่รวบรวมไดอารี่โบราณ วัตถุสิ่งของยุคอดีต และจดหมายโบราณของเมืองลูนาเรีย สะท้อนถึงการเป็นผู้เก็บกักความทรงจำและไม่เคยละทิ้งรากฐานดั้งเดิม เป็นจุดที่รักษาสัญญากับวันเก่าๆ ที่สวยงามในชีวิตเสมอ"
    },
    loyal: {
        title: "ย่านสะพานสายใยซื่อสัตย์ (The Bridges of Loyalty)",
        trait: "ซื่อสัตย์และภักดี มั่นคงไม่สั่นคลอน (Loyal)",
        icon: "heart-handshake",
        colorClass: "bg-rose-950/60 border border-rose-400/30",
        visual: "[รูปสะพานศิลาเชื่อมเกาะทั้งสองข้างด้วยเส้นใยสีแดงอบอุ่น]",
        desc: "ทางเดินเชื่อมต่อหลักที่สร้างจากศิลาชิ้นแกร่งและลวดเหล็กกล้าที่ยึดโครงสร้างสะพานเข้าด้วยกันแบบทนทานชั่วนิรันดร์ ตัวสะพานเปรียบเสมือนสัญญาพันธมิตรว่า หากชาวกรกฎเปิดรับคุณเข้ามาเป็นหนึ่งในอาณาจักรและสายสัมพันธ์แล้ว พวกเขาจะมั่นคง ภักดี และคอยโอบอุ้มในทุกช่วงกาลเวลา"
    },
    imaginative: {
        title: "สวนลอยแห่งจินตนาการ (The Gardens of Reverie)",
        trait: "จินตนาการสูงล้ำ ศิลปะและการคิดสร้างสรรค์เหนือผืนน้ำ",
        icon: "palette",
        colorClass: "bg-purple-950/60 border border-purple-400/30",
        visual: "[รูปสวนพฤกษาลอยฟ้าเหนือน้ำ ต้นไม้เรืองแสงรูปร่างพลิ้วไหวตามความฝัน]",
        desc: "เป็นจุดศูนย์กลางด้านความคิดฝันสร้างสรรค์และสุนทรียภาพ สวนลอยที่พืชพันธุ์ประหลาดจะแผ่กิ่งก้านเรืองแสงเปลี่ยนสีได้เองตามพลังจินตนาการของราศีธาตุน้ำ แสดงออกถึงจุดแข็งที่มีความสร้างสรรค์ อ่อนหวาน มีพรสวรรค์สูงส่งในงานศิลป์และการจินตนาการสรรค์สร้าง"
    }
};

function selectLandmark(key) {
    document.querySelectorAll('.landmark-btn').forEach(btn => {
        btn.classList.remove('border-sky-500', 'bg-sky-950/40');
        btn.classList.add('border-slate-800', 'bg-slate-950');
    });
    document.querySelectorAll('[id^="badge-"]').forEach(badge => {
        badge.classList.remove('bg-sky-500', 'text-slate-950', 'border-sky-400');
        badge.classList.add('bg-slate-900', 'text-slate-400', 'border-slate-800');
    });

    const targetBtn = document.getElementById(`btn-${key}`);
    const targetBadge = document.getElementById(`badge-${key}`);
    const data = landmarks[key];
    const detailsDiv = document.getElementById('landmark-details');
    if (!data || !detailsDiv) return;

    if (targetBtn && targetBadge) {
        targetBtn.classList.remove('border-slate-800', 'bg-slate-950');
        targetBtn.classList.add('border-sky-500', 'bg-sky-950/40');
        targetBadge.classList.remove('bg-slate-900', 'text-slate-400', 'border-slate-800');
        targetBadge.classList.add('bg-sky-500', 'text-slate-950', 'border-sky-400');
    }

    const iconBg = document.getElementById('landmark-icon-bg');
    const iconEl = document.getElementById('landmark-icon');

    document.getElementById('landmark-title').innerText = data.title;
    document.getElementById('landmark-zodiac-trait').innerText = data.trait;
    document.getElementById('landmark-visual').innerText = data.visual;
    document.getElementById('landmark-desc').innerText = data.desc;

    if (iconBg) {
        iconBg.className = `w-12 h-12 rounded-2xl flex items-center justify-center ${data.colorClass}`;
    }
    if (iconEl) {
        iconEl.setAttribute('data-lucide', data.icon);
        lucide.createIcons();
    }

    detailsDiv.style.opacity = '0';
    setTimeout(() => {
        detailsDiv.style.opacity = '1';
    }, 150);
}

const moonPhases = {
    new: {
        glowClass: 'rgba(51, 65, 85, 0.4)',
        bgColor: 'bg-slate-900',
        moodBadge: "อารมณ์รักสันโดษและระมัดระวัง (Defensive / Withdrawn)",
        title: "เมื่อดวงจันทร์ดับสลาย... คืนแห่งการหลบเข้ากระดอง",
        description: "เมื่อไม่มีแสงสว่างในยามค่ำคืน บรรยากาศเมืองจะค่อนข้างเงียบสงัดและดึงความสงบเงียบกลับคืนมา ชาวเมืองจะมีอารมณ์เงียบๆ หลบเข้าถ้ำเพื่อฟื้นฟูเยียวยาจิตใจตนเอง และเก็บซ่อนความกลัว ความหึงหวง หรือความระแวงอดีตไว้ในเปลือกแข็งหนาทึบ เป็นคืนแห่งการกักตุนไออุ่นเพื่อตนเอง",
        sensitive: "30%",
        defense: "95%",
        heroGlow: '0 0 50px 10px rgba(30, 41, 59, 0.4)'
    },
    waxing: {
        glowClass: 'rgba(125, 211, 252, 0.3)',
        bgColor: 'bg-gradient-to-r from-sky-900 to-slate-800',
        moodBadge: "อารมณ์จินตนาการและใส่ใจ (Imaginative & Caring)",
        title: "เมื่อพระจันทร์เสี้ยวเริ่มทอแสง... ประตูเมืองเริ่มเปิดรับ",
        description: "ในเวลาจันทร์เสี้ยว ความอ่อนหวานในจิตวิญญาณจะค่อย ๆ แผ่ขยายออกนอกเปลือกปู แสงจันทร์เลียบชายน้ำส่งผลให้ระดับอารมณ์อบอุ่นขึ้น เริ่มตื่นตัวและเปิดรับแขกบ้านแขกเมืองด้วยความระมัดระวังปนใส่ใจ แต่ก็แฝงไว้ด้วยจิตนาการกว้างไกลและสุนทรียภาพทางศิลปะเด่นขึ้นมา",
        sensitive: "60%",
        defense: "65%",
        heroGlow: '0 0 50px 15px rgba(14, 116, 144, 0.3)'
    },
    full: {
        glowClass: 'rgba(186, 230, 253, 0.6)',
        bgColor: 'bg-gradient-to-r from-sky-200 to-indigo-100',
        moodBadge: "อารมณ์แปรปรวนแต่อ่อนไหวสูงสุด (Sensitive & Empathy)",
        title: "เมื่อจันทร์เพ็ญเต็มดวง... มหาสมุทรแห่งความรู้สึกสั่นสะเทือน",
        description: "พลังของวันเพ็ญทำให้ชาวลูนาเรียเปิดใจกว้างอย่างไร้เงื่อนไข ความแข็งเกร้าวลบล้างไปเกือบหมดสิ้น พวกเขาเข้าอกเข้าใจและเข้าหาเพื่อช่วยเหลือผู้คนรอบข้างด้วยความซื่อสัตย์ แต่เป็นคืนที่ความนึกคิด ความจำในแผลเก่า และความปรารถนาปกป้องคนรักจะมีมากเป็นพิเศษ อารมณ์พรั่งพรูดุจสายน้ำทะลักล้นผืนดิน",
        sensitive: "98%",
        defense: "15%",
        heroGlow: '0 0 80px 25px rgba(186, 230, 253, 0.4)'
    },
    waning: {
        glowClass: 'rgba(165, 180, 252, 0.4)',
        bgColor: 'bg-gradient-to-r from-indigo-900 to-slate-900',
        moodBadge: "อารมณ์หวนรำลึกอดีตแสนมั่นคง (Nostalgic & Loyal)",
        title: "เมื่อดวงจันทร์แรมเว้าแหว่ง... นึกถึงความทรงจำที่จากไป",
        description: "ช่วงเวลาดวงจันทร์หันหลังถดถอย อากาศในเมืองเย็นลงอย่างนุ่มนวล ผู้คนจะหยิบจับของขวัญเก่าย้อนวัย นึกถึงมิตรภาพครั้งอดีต โทรหาครอบครัวเพื่อรักษาสายสัมพันธ์ที่ซื่อสัตย์เหนียวแน่น เป็นช่วงเวลาของการปกป้องบ้านเรือนให้สงบ สะสมกำลังอุ่นและสร้างความสุขให้กับครอบครัวอย่างยิ่งยวดยิ่งกว่าช่วงใดๆ",
        sensitive: "75%",
        defense: "50%",
        heroGlow: '0 0 60px 15px rgba(99, 102, 241, 0.3)'
    }
};

function setMoonPhase(phase) {
    document.querySelectorAll('.moon-phase-btn').forEach(btn => {
        btn.classList.remove('border-sky-500', 'bg-sky-950/60');
        btn.classList.add('border-slate-800', 'bg-slate-950');
    });
    const button = document.getElementById(`btn-phase-${phase}`);
    const data = moonPhases[phase];
    if (!button || !data) return;

    button.classList.remove('border-slate-800', 'bg-slate-950');
    button.classList.add('border-sky-500', 'bg-sky-950/60');

    const moonSim = document.getElementById('moon-simulation');
    const heroMoon = document.getElementById('hero-moon');
    const title = document.getElementById('mood-title');
    const desc = document.getElementById('mood-description');
    const badge = document.getElementById('mood-badge');
    const sensitiveVal = document.getElementById('stat-sensitive');
    const defenseVal = document.getElementById('stat-defense');

    if (moonSim) {
        moonSim.className = `w-28 h-28 rounded-full transition-all duration-700 ${data.bgColor}`;
        moonSim.style.boxShadow = `0 0 40px 10px ${data.glowClass}`;
    }
    if (heroMoon) {
        heroMoon.style.boxShadow = data.heroGlow;
    }
    if (title && desc && badge && sensitiveVal && defenseVal) {
        title.style.opacity = '0.3';
        desc.style.opacity = '0.3';
        setTimeout(() => {
            badge.innerText = data.moodBadge;
            title.innerText = data.title;
            desc.innerText = data.description;
            sensitiveVal.innerText = data.sensitive;
            defenseVal.innerText = data.defense;
            title.style.opacity = '1';
            desc.style.opacity = '1';
        }, 200);
    }
}

let memories = [
    { id: 1, author: "กวีพเนจรไร้ชื่อ", text: "วันเกิดปีที่สิบสอง ฉันได้รับกล่องของขวัญเก่าโบราณจากคุณย่าจนถึงวันนี้ฉันก็ยังตั้งมันไว้ที่โต๊ะข้างเตียง ทุกครั้งที่มองเห็นฉันรู้สึกว่าบ้านและหัวใจไม่เคยไร้คนโอบกอด", date: "บันทึกในอดีต 2 ปีก่อน" },
    { id: 2, author: "นักสำรวจธาตุน้ำ", text: "เปลือกกระดองของเราสร้างไว้เพื่อไม่ให้ถูกทำร้าย แต่หากคุณยินดีเข้ามานั่งจิบน้ำชาข้างเตาไฟในวิหารบ้านของเรา คุณจะรู้เลยว่าเราพร้อมภักดีและโอบอุ้มคุณอย่างมั่นคงที่สุด", date: "บันทึกเมื่อวานนี้" }
];

function renderMemories() {
    const container = document.getElementById('memories-container');
    if (!container) return;
    container.innerHTML = memories.map(m => `
        <div class="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-1.5 transition duration-150">
            <div class="flex items-center justify-between">
                <span class="font-title text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <i data-lucide="user" class="w-3 h-3 text-amber-400"></i> ${m.author}
                </span>
                <span class="text-[10px] text-slate-500">${m.date}</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${m.text}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

function addMemory(e) {
    e.preventDefault();
    const authorInput = document.getElementById('author');
    const textInput = document.getElementById('memory-text');
    if (!authorInput || !textInput) return;

    const newMemory = {
        id: memories.length + 1,
        author: authorInput.value,
        text: textInput.value,
        date: "เพิ่งบันทึกตะกี้นี้"
    };
    memories.unshift(newMemory);
    renderMemories();
    authorInput.value = '';
    textInput.value = '';

    const alertBox = document.getElementById('custom-alert');
    if (!alertBox) return;
    alertBox.classList.remove('translate-y-24', 'opacity-0');
    alertBox.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
        alertBox.classList.remove('translate-y-0', 'opacity-100');
        alertBox.classList.add('translate-y-24', 'opacity-0');
    }, 4000);
}

const compResults = {
    scorpio: {
        rate: "98% (เกื้อหนุนดั่งสายน้ำท่วมท้น)",
        eval: "สอดคล้องอย่างสมบูรณ์แบบสูงสุด! ทั้งกรกฎและพิจิกเป็นกลุ่มราศีธาตุน้ำเช่นกัน ต่างเข้าอกเข้าใจโดยไม่ต้องเปล่งวาจา ความต้องการความซื่อสัตย์ภักดีและความเป็นส่วนตัวของพิจิกจะไปตรงใจกับเกราะของชาวกรกฎอย่างมหัศจรรย์ เป็นคู่สายสัมพันธ์ที่ดูแลซึ่งกันและกันอย่างทุ่มเทไม่จางหาย"
    },
    pisces: {
        rate: "95% (รักแรกและความนุ่มนวลแห่งทะเลสาบ)",
        eval: "เข้ากันได้อย่างลึกซึ้งโรแมนติกเป็นที่สุด ราศีมีนคือตัวแทนแห่งความเห็นใจและจินตนาการกว้างไกล เมื่อผสานเข้ากับชาวกรกฎผู้รักครอบครัวและคอยดูแล บ้านจะเต็มไปด้วยความหวานชื่น สัญชาตญาณทั้งคู่แม่นยำและมองตาก็รู้ใจ ไร้กำแพงอันแข็งกร้าวใดมากั้นขวาง"
    },
    taurus: {
        rate: "90% (ความมั่นคงและไออุ่นแห่งผืนดิน)",
        eval: "ความมั่นคงยืนหนึ่ง! ราศีพฤษภธาตุดินเป็นคนรักระเบียบและความปลอดภัย มักสะสมความมั่นคงทางการเงินและบ้าน ส่วนกรกฎรักบ้านและดูแลจิตใจดีเยี่ยม ยามดึกสงัดทั้งสองจะนอนพิงหมอนคุยเรื่องอนาคต แสวงหาความสบายกายใจ เป็นคู่ราศีที่ก้าวเดินไปด้วยความมั่นคงอบอุ่นยาวนาน"
    },
    aries: {
        rate: "50% (ความต่างที่ต้องปรับตัวเพื่อความเข้าใจ)",
        eval: "ราศีเมษ (ธาตุไฟ) มักพุ่งชนเป้าหมายด้วยความรวดเร็วและร้อนรุ่ม ซึ่งตรงข้ามอย่างยิ่งกับความต้องการเกราะกำแพงเก็บตัวและความแปรปรวนอ่อนโยนของชาวเมืองกรกฎ อาจจะทำให้กรกฎน้อยอกน้อยใจบ่อยครั้ง แต่หากปรับตัว ความมุ่งมั่นของเมษจะคอยปกป้องใจบางๆ ของกรกฎได้เป็นอย่างดี"
    },
    leo: {
        rate: "65% (แสงอาทิตย์ปะทะเงาจันทร์ในลำน้ำ)",
        eval: "ราศีสิงห์รักการแสดงออก ความโดดเด่น และได้รับการยกย่อง ส่วนกรกฎรักความสงบในพื้นที่ปลอดภัย แต่ทั้งคู่ปกครองโดยคู่หูดาวเด่น (อาทิตย์ปะทะดวงจันทร์) หากสิงห์คอยโอบอุ้มดูแลไม่เรียกร้องความโดดเด่นเกินไป และกรกฎให้การสนับสนุนด้วยความภักดีอย่างสม่ำเสมอ ความต่างนี้จะรวมกันเป็นจุดสว่างไสวที่อบอุ่นและลงตัวพอดี"
    },
    aquarius: {
        rate: "75% (สายใยที่เชื่อมใจแบบรักความอิสระ)",
        eval: "ราศีกุมภ์เป็นราศีธาตุลมที่ให้ความสำคัญกับการปฏิวัติแนวคิดใหม่ๆ มีจังหวะชีวิตที่เปิดกว้าง แม้ภายนอกจะดูสับสน แต่ความซื่อสัตย์ต่อเพื่อนมนุษย์ของกุมภ์ดึงดูดกระแสน้ำกรกฎได้ดี กุมภ์สามารถชักชวนให้กรกฎมองโลกมุมกว้างขึ้น ในขณะที่กรกฎก็ช่วยเติมเต็มความรู้สึกอบอุ่นให้พ้นจากความโดดเดี่ยว"
    },
    gemini: {
        rate: "55% (ความหวั่นไหวและสายลมแปรปรวน)",
        eval: "ราศีเมถุนรักความตื่นเต้น คล่องตัว ช่างพูดคุย และบางครั้งรักความลื่นไหล ซึ่งอาจกระทบใจชาวกรกฎที่มองหาหลักประกันความมั่นคงและความซื่อสัตย์ถาวรได้ง่าย จำเป็นต้องมีการเจรจาทำความเข้าใจลึกซึ้ง และไม่เอาแต่เก็บตัวเงียบใส่กันเพื่อหลีกเลี่ยงกระแสน้ำตาตื้น"
    }
};

function checkZodiacCompatibility() {
    const select = document.getElementById('zodiac-select');
    const target = select ? select.value : null;
    const data = target ? compResults[target] : null;
    const resultBox = document.getElementById('compatibility-result');
    if (!data || !resultBox) return;

    resultBox.style.opacity = '0';
    setTimeout(() => {
        resultBox.innerHTML = `
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 border-b border-slate-900 pb-4">
                <div>
                    <span class="text-xs text-slate-500 uppercase tracking-wider block">ระดับความเข้ากันได้</span>
                    <span class="font-title text-lg font-bold text-rose-400" id="comp-rate">${data.rate}</span>
                </div>
                <div class="inline-flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-400/20 px-2.5 py-1 rounded-full text-xs font-medium">
                    <i data-lucide="activity" class="w-3.5 h-3.5"></i> ตรวจเช็กพลังเคมีสัมพันธ์
                </div>
            </div>
            <div>
                <span class="text-xs text-slate-500 uppercase tracking-wider block mb-1">ผลวิเคราะห์ดวงสัมพันธ์</span>
                <p class="text-sm text-slate-300 leading-relaxed" id="comp-eval">${data.eval}</p>
            </div>
        `;
        lucide.createIcons();
        resultBox.style.opacity = '1';
    }, 150);
}

function initPage() {
    selectLandmark('defensive');
    setMoonPhase('full');
    renderMemories();
    checkZodiacCompatibility();
}

initPage();
