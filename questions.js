/* Ngân hàng câu hỏi quiz kiến thức cung hoàng đạo.
   - Z: bảng dữ liệu 12 cung, dùng để sinh tự động câu hỏi tra cứu.
   - HAND: câu hỏi viết tay theo từng mảng, dạng [câu hỏi, đáp án đúng, [3 đáp án sai], giải thích].
   Thêm câu mới: thêm một dòng vào mảng tương ứng trong HAND. */
(function () {
  const Z = [
    {n:'Bạch Dương',l:'Aries',g:'♈',s:[21,3],e:[19,4],el:0,mo:0,r:'Sao Hỏa',rc:null,sym:'Con cừu đực',star:'Hamal',body:'Đầu và mặt',
     house:'Bản thân, ngoại hình và cách bạn bắt đầu mọi việc',kw:['xông xáo, thích dẫn đầu và ghét phải chờ đợi','nóng tính nhưng giận nhanh, quên cũng nhanh'],weak:'Nóng vội, thiếu kiên nhẫn'},
    {n:'Kim Ngưu',l:'Taurus',g:'♉',s:[20,4],e:[20,5],el:1,mo:1,r:'Sao Kim',rc:null,sym:'Con bò đực',star:'Aldebaran',body:'Cổ và cổ họng',
     house:'Tiền bạc, tài sản và giá trị bản thân',kw:['kiên nhẫn, yêu sự ổn định và an toàn','mê đồ ăn ngon và những món đồ đẹp, bền'],weak:'Bướng bỉnh, ngại thay đổi'},
    {n:'Song Tử',l:'Gemini',g:'♊',s:[21,5],e:[20,6],el:2,mo:2,r:'Sao Thủy',rc:null,sym:'Cặp song sinh',star:'Pollux',body:'Vai, cánh tay và phổi',
     house:'Giao tiếp, học tập, anh chị em và những chuyến đi ngắn',kw:['nói chuyện duyên, tò mò đủ thứ trên đời','đổi ý nhanh, thích làm nhiều việc cùng lúc'],weak:'Thiếu kiên định, dễ phân tán'},
    {n:'Cự Giải',l:'Cancer',g:'♋',s:[21,6],e:[22,7],el:3,mo:0,r:'Mặt Trăng',rc:null,sym:'Con cua',star:null,body:'Ngực và dạ dày',
     house:'Gia đình, nhà cửa và cội nguồn',kw:['coi gia đình là chỗ dựa quan trọng nhất','vỏ ngoài cứng rắn nhưng trái tim rất mềm'],weak:'Hay tủi thân, khó buông chuyện cũ'},
    {n:'Sư Tử',l:'Leo',g:'♌',s:[23,7],e:[22,8],el:0,mo:1,r:'Mặt Trời',rc:null,sym:'Con sư tử',star:'Regulus',body:'Tim và lưng',
     house:'Sáng tạo, vui chơi, tình yêu lãng mạn và con cái',kw:['thích làm trung tâm của sự chú ý','hào phóng, tự tin và thích tỏa sáng'],weak:'Sĩ diện, cần được khen ngợi'},
    {n:'Xử Nữ',l:'Virgo',g:'♍',s:[23,8],e:[22,9],el:1,mo:2,r:'Sao Thủy',rc:null,sym:'Trinh nữ cầm bó lúa',star:'Spica',body:'Hệ tiêu hóa và ruột',
     house:'Công việc hằng ngày, thói quen và sức khỏe',kw:['tỉ mỉ, để ý từng chi tiết nhỏ','thích giúp đỡ người khác một cách thực tế'],weak:'Cầu toàn, hay lo và tự phê bình'},
    {n:'Thiên Bình',l:'Libra',g:'♎',s:[23,9],e:[22,10],el:2,mo:0,r:'Sao Kim',rc:null,sym:'Cái cân',star:null,body:'Thận và thắt lưng',
     house:'Hôn nhân, đối tác và các mối quan hệ một-một',kw:['yêu cái đẹp và coi trọng sự công bằng','khéo hòa giải, rất ngại xung đột'],weak:'Khó đưa ra quyết định'},
    {n:'Bọ Cạp',l:'Scorpio',g:'♏',s:[23,10],e:[21,11],el:3,mo:1,r:'Sao Diêm Vương',rc:'Sao Hỏa',sym:'Con bọ cạp',star:'Antares',body:'Cơ quan sinh sản',
     house:'Sự biến đổi, tài sản chung và những điều bí ẩn',kw:['bí ẩn, cảm xúc mãnh liệt nhưng giấu kín','nhìn thấu động cơ của người khác'],weak:'Đa nghi, khó tha thứ'},
    {n:'Nhân Mã',l:'Sagittarius',g:'♐',s:[22,11],e:[21,12],el:0,mo:2,r:'Sao Mộc',rc:null,sym:'Nhân mã cầm cung',star:'Kaus Australis',body:'Hông và đùi',
     house:'Triết lý, học vấn cao và những chuyến đi xa',kw:['yêu tự do, mê xê dịch và khám phá','lạc quan, nói thẳng đến mức hơi phũ'],weak:'Hứa nhiều, thiếu kiên nhẫn với chi tiết'},
    {n:'Ma Kết',l:'Capricorn',g:'♑',s:[22,12],e:[19,1],el:1,mo:0,r:'Sao Thổ',rc:null,sym:'Con dê biển',star:'Deneb Algedi',body:'Đầu gối, xương và răng',
     house:'Sự nghiệp, danh tiếng và vị trí xã hội',kw:['kỷ luật, luôn có kế hoạch dài hạn','chín chắn, có trách nhiệm từ khi còn nhỏ'],weak:'Khắt khe, quá đặt nặng công việc'},
    {n:'Bảo Bình',l:'Aquarius',g:'♒',s:[20,1],e:[18,2],el:2,mo:1,r:'Sao Thiên Vương',rc:'Sao Thổ',sym:'Người mang bình nước',star:'Sadalsuud',body:'Cẳng chân và mắt cá chân',
     house:'Bạn bè, cộng đồng và ước mơ tương lai',kw:['khác người, có tư tưởng đi trước thời đại','độc lập, quan tâm đến cộng đồng hơn chuyện riêng'],weak:'Xa cách cảm xúc, bướng theo kiểu riêng'},
    {n:'Song Ngư',l:'Pisces',g:'♓',s:[19,2],e:[20,3],el:3,mo:2,r:'Sao Hải Vương',rc:'Sao Mộc',sym:'Hai con cá bơi ngược chiều',star:null,body:'Bàn chân',
     house:'Tiềm thức, sự hy sinh và những điều khép kín',kw:['mơ mộng, giàu trí tưởng tượng','đồng cảm sâu, dễ xúc động theo người khác'],weak:'Dễ trốn tránh thực tế'}
  ];
  const EL = ['Lửa','Đất','Khí','Nước'];
  const MO = ['Thống lĩnh','Cố định','Biến đổi'];
  const N = Z.map(z => z.n);
  const ORD = ['thứ nhất','thứ hai','thứ ba','thứ tư','thứ năm','thứ sáu','thứ bảy','thứ tám','thứ chín','thứ mười','thứ mười một','thứ mười hai'];
  const dm = ([d,m]) => `${d}/${m}`;
  const range = z => `${dm(z.s)} – ${dm(z.e)}`;
  const shift = ([d,m],k) => { const t = new Date(2001,m-1,d+k); return [t.getDate(), t.getMonth()+1]; };
  const G = c => c + '︎';

  const CATS = [
    {id:'nen-tang',name:'Kiến thức nền tảng',level:'Dễ',desc:'Thứ tự 12 cung, cung Mặt Trời, cung Mọc, đường hoàng đạo'},
    {id:'ngay-sinh',name:'Ngày sinh',level:'Dễ',desc:'Sinh ngày nào thuộc cung nào, ngày giáp ranh'},
    {id:'bieu-tuong',name:'Biểu tượng & ký hiệu',level:'Dễ',desc:'Hình tượng, ký hiệu \u2648\uFE0E\u2649\uFE0E\u264A\uFE0E, tên Latin, cung đối diện'},
    {id:'tinh-cach',name:'Tính cách',level:'Dễ',desc:'Cung nào nổi tiếng với nét tính cách nào'},
    {id:'nguyen-to',name:'Nguyên tố & tính chất',level:'Vừa',desc:'Lửa, Đất, Khí, Nước; Thống lĩnh, Cố định, Biến đổi'},
    {id:'chu-tinh',name:'Hành tinh chủ quản',level:'Vừa',desc:'Chủ tinh cổ điển và hiện đại, ý nghĩa các hành tinh'},
    {id:'lich-su',name:'Lịch sử & văn hóa',level:'Vừa',desc:'Nguồn gốc, tên gọi khác, chiêm tinh y học, văn hóa đại chúng'},
    {id:'than-thoai',name:'Thần thoại',level:'Khó',desc:'Các truyện Hy Lạp đứng sau từng cung'},
    {id:'thien-van',name:'Thiên văn học',level:'Khó',desc:'Chòm sao thật, sao sáng nhất, tuế sai, mưa sao băng'},
    {id:'nha-goc',name:'12 nhà & góc chiếu',level:'Khó',desc:'Ý nghĩa 12 nhà trong bản đồ sao, các góc hợp và xung'}
  ];

  const Q = [];
  const pick3 = (a, pool) => {
    const p = [...new Set(pool.filter(x => x && x !== a))];
    for (let i = p.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [p[i],p[j]] = [p[j],p[i]]; }
    return p.slice(0,3);
  };
  const add = (c, q, a, w, e) => Q.push({c, q, a, w: Array.isArray(w) && w.length === 3 ? w : pick3(a, w), e});

  /* ----- Sinh tự động từ bảng dữ liệu ----- */
  Z.forEach((z, i) => {
    const prev = Z[(i+11)%12], next = Z[(i+1)%12], opp = Z[(i+6)%12];
    const others = N.filter(n => n !== z.n);
    // Nền tảng
    add('nen-tang', `${z.n} là cung thứ mấy trên vòng hoàng đạo?`, `Thứ ${i+1}`, Z.map((_,k)=>`Thứ ${k+1}`), `Thứ tự bắt đầu từ Bạch Dương (thứ 1) và kết thúc ở Song Ngư (thứ 12). ${z.n} đứng thứ ${i+1}.`);
    add('nen-tang', `Sau khi rời cung ${z.n}, Mặt Trời đi vào cung nào?`, next.n, [prev.n, opp.n, ...others], `Thứ tự là ${prev.n} → ${z.n} → ${next.n}.`);
    add('nen-tang', `Cung nào đứng ngay trước ${z.n}?`, prev.n, [next.n, opp.n, ...others], `${prev.n} (${range(prev)}) đứng ngay trước ${z.n} (${range(z)}).`);
    // Ngày sinh
    add('ngay-sinh', `Cung ${z.n} kéo dài trong khoảng thời gian nào?`, range(z), Z.map(range), `${z.n}: ${range(z)}. Ngày có thể lệch 1 ngày tùy năm vì Mặt Trời không vào cung đúng cùng một giờ mỗi năm.`);
    add('ngay-sinh', `Người sinh ngày ${dm(z.s)} thuộc cung nào?`, z.n, [prev.n, next.n, ...others], `${dm(z.s)} là ngày đầu tiên của ${z.n}. Ngày trước đó vẫn thuộc ${prev.n}.`);
    add('ngay-sinh', `Người sinh ngày ${dm(z.e)} thuộc cung nào?`, z.n, [next.n, prev.n, ...others], `${dm(z.e)} là ngày cuối cùng của ${z.n}. Ngày hôm sau đã sang ${next.n}.`);
    add('ngay-sinh', `Người sinh ngày ${dm(shift(z.s,12))} thuộc cung nào?`, z.n, [prev.n, next.n, ...others], `${z.n} kéo dài từ ${range(z)}.`);
    add('ngay-sinh', `Ngày ${dm(shift(z.s,-1))} là ngày cuối của cung nào?`, prev.n, [z.n, next.n, ...others], `${prev.n} kết thúc ngày ${dm(prev.e)}, hôm sau bắt đầu ${z.n}.`);
    // Biểu tượng
    add('bieu-tuong', `Biểu tượng của cung ${z.n} là gì?`, z.sym, Z.map(x=>x.sym), `${z.n} được tượng trưng bằng ${z.sym.toLowerCase()}.`);
    add('bieu-tuong', `Ký hiệu ${G(z.g)} là của cung nào?`, z.n, [prev.n, next.n, ...others], `${G(z.g)} là ký hiệu của ${z.n}.`);
    add('bieu-tuong', `Tên Latin "${z.l}" là cung nào?`, z.n, others, `${z.l} là tên Latin (và tên tiếng Anh) của ${z.n}.`);
    add('bieu-tuong', `Cung nào nằm đối diện ${z.n} trên vòng hoàng đạo (cách 180°)?`, opp.n, [prev.n, next.n, Z[(i+4)%12].n, Z[(i+3)%12].n], `Hai cung đối diện cách nhau 6 cung. ${z.n} và ${opp.n} là một cặp đối diện.`);
    // Tính cách
    z.kw.forEach(k => add('tinh-cach', `Cung nào thường được mô tả là "${k}"?`, z.n, others, `Đây là nét tính cách thường gắn với ${z.n} (${EL[z.el]}, ${MO[z.mo]}).`));
    add('tinh-cach', `Điểm yếu nào thường được gán cho ${z.n}?`, z.weak, Z.map(x=>x.weak), `${z.n} hay bị nói là: ${z.weak.toLowerCase()}.`);
    // Nguyên tố & tính chất
    add('nguyen-to', `${z.n} thuộc nguyên tố nào?`, EL[z.el], EL, `${z.n} thuộc nhóm ${EL[z.el]} cùng ${Z.filter(x=>x.el===z.el&&x!==z).map(x=>x.n).join(' và ')}.`);
    add('nguyen-to', `${z.n} thuộc nhóm tính chất nào?`, MO[z.mo], [...MO, 'Hỗn hợp'], `${z.n} là cung ${MO[z.mo]}, cùng nhóm với ${Z.filter(x=>x.mo===z.mo&&x!==z).map(x=>x.n).join(', ')}.`);
    const sameEl = Z.filter(x=>x.el===z.el&&x!==z);
    add('nguyen-to', `Cung nào cùng nguyên tố với ${z.n}?`, sameEl[0].n, Z.filter(x=>x.el!==z.el).map(x=>x.n), `${z.n}, ${sameEl[0].n} và ${sameEl[1].n} đều thuộc nhóm ${EL[z.el]}.`);
    add('nguyen-to', `Cung nào vừa thuộc nguyên tố ${EL[z.el]}, vừa thuộc nhóm ${MO[z.mo]}?`, z.n, [...sameEl.map(x=>x.n), ...Z.filter(x=>x.mo===z.mo&&x!==z).map(x=>x.n)], `Mỗi cặp nguyên tố và tính chất chỉ ứng với đúng một cung. ${EL[z.el]} + ${MO[z.mo]} là ${z.n}.`);
    // Chủ tinh
    add('chu-tinh', `Hành tinh chủ quản${z.rc?' (theo chiêm tinh hiện đại)':''} của ${z.n} là gì?`, z.r, ['Mặt Trời','Mặt Trăng','Sao Thủy','Sao Kim','Sao Hỏa','Sao Mộc','Sao Thổ','Sao Thiên Vương','Sao Hải Vương','Sao Diêm Vương'], `${z.n} do ${z.r} chủ quản${z.rc?`. Chiêm tinh cổ điển dùng ${z.rc}`:''}.`);
    if (z.rc) add('chu-tinh', `Theo chiêm tinh cổ điển (trước khi tìm ra các hành tinh xa), ${z.n} do hành tinh nào chủ quản?`, z.rc, ['Sao Hỏa','Sao Mộc','Sao Thổ','Sao Kim','Sao Thủy','Mặt Trăng'], `Chiêm tinh cổ điển chỉ biết 7 thiên thể nhìn thấy bằng mắt thường. ${z.n} được gán cho ${z.rc}, ngày nay dùng ${z.r}.`);
    // Thiên văn
    if (z.star) add('thien-van', `Ngôi sao sáng nhất của chòm sao ${z.n} là sao nào?`, z.star, Z.map(x=>x.star), `${z.star} là sao sáng nhất chòm ${z.n} (${z.l}).`);
    // Nhà
    add('nha-goc', `Nhà thứ ${i+1} trong bản đồ sao bàn về lĩnh vực nào?`, z.house, Z.map(x=>x.house), `Nhà ${i+1}: ${z.house.toLowerCase()}. Nhà này tương ứng tự nhiên với cung ${z.n}.`);
    add('nha-goc', `Nhà thứ ${i+1} tương ứng tự nhiên với cung nào?`, z.n, [prev.n, next.n, ...others], `Theo thứ tự, nhà 1 ứng với Bạch Dương, nhà 12 ứng với Song Ngư. Nhà ${i+1} ứng với ${z.n}.`);
    // Lịch sử: chiêm tinh y học
    add('lich-su', `Chiêm tinh y học thời xưa gắn cung ${z.n} với bộ phận nào trên cơ thể?`, z.body, Z.map(x=>x.body), `Hình "người hoàng đạo" thời Trung Cổ xếp các cung từ đầu (Bạch Dương) xuống chân (Song Ngư). ${z.n} ứng với ${z.body.toLowerCase()}.`);
  });

  /* ----- Câu hỏi viết tay ----- */
  const HAND = {
    'nen-tang': [
      ['Vòng hoàng đạo trong chiêm tinh có bao nhiêu cung?','12',['10','13','24'],'Chiêm tinh chia hoàng đạo thành 12 cung bằng nhau. Chòm Xà Phu cũng nằm trên đường hoàng đạo nhưng không được tính thành cung.'],
      ['Mỗi cung hoàng đạo chiếm bao nhiêu độ?','30°',['15°','24°','36°'],'360° chia đều cho 12 cung, mỗi cung đúng 30°.'],
      ['Cung nào mở đầu vòng hoàng đạo?','Bạch Dương',['Song Ngư','Ma Kết','Bảo Bình'],'Vòng hoàng đạo bắt đầu từ điểm xuân phân (khoảng 21/3), lúc Mặt Trời vào Bạch Dương.'],
      ['Từ "zodiac" có gốc tiếng Hy Lạp nghĩa là gì?','Vòng tròn các con vật',['Con đường của các vị thần','Bản đồ các vì sao','Vòng quay của thời gian'],'"Zōidiakos kyklos" nghĩa là vòng tròn các con vật nhỏ, vì phần lớn các cung mang hình con vật.'],
      ['"Cung hoàng đạo" mà ta hay nói (ví dụ "tớ là Sư Tử") dựa trên vị trí của thiên thể nào lúc sinh?','Mặt Trời',['Mặt Trăng','Sao Kim','Sao Bắc Đẩu'],'Đó là cung Mặt Trời. Bản đồ sao đầy đủ còn có cung Mặt Trăng, cung Mọc và vị trí các hành tinh.'],
      ['Muốn biết cung Mọc (Ascendant), bạn cần thêm thông tin gì ngoài ngày sinh?','Giờ và nơi sinh',['Nhóm máu','Năm sinh âm lịch','Tên khai sinh'],'Cung Mọc là cung đang lên ở chân trời phía đông lúc bạn sinh, đổi khoảng 2 giờ một lần.'],
      ['Cung Mặt Trăng được xác định bởi điều gì?','Vị trí Mặt Trăng lúc bạn sinh',['Ngày rằm gần nhất','Tháng âm lịch bạn sinh','Pha trăng đêm bạn sinh'],'Mặt Trăng đi nhanh, chỉ ở mỗi cung khoảng 2,5 ngày, nên cần biết khá chính xác thời điểm sinh.'],
      ['Mặt Trời ở trong mỗi cung khoảng bao lâu?','Khoảng 1 tháng',['Khoảng 1 tuần','Khoảng 2,5 ngày','Khoảng 1 năm'],'Mặt Trời đi hết 12 cung trong một năm, mỗi cung khoảng 30 ngày.'],
      ['Mặt Trăng đi qua mỗi cung trong khoảng bao lâu?','Khoảng 2,5 ngày',['Khoảng 1 tháng','Khoảng 1 tuần','Khoảng 12 giờ'],'Mặt Trăng đi hết vòng hoàng đạo trong khoảng 27,3 ngày.'],
      ['Sao Mộc ở lại mỗi cung khoảng bao lâu?','Khoảng 1 năm',['Khoảng 1 tháng','Khoảng 2,5 năm','Khoảng 7 năm'],'Sao Mộc quay quanh Mặt Trời mất gần 12 năm, nên mỗi cung khoảng 1 năm.'],
      ['"Sao Thổ trở lại" (Saturn return) lần đầu xảy ra vào khoảng tuổi nào?','29–30 tuổi',['18 tuổi','40 tuổi','50 tuổi'],'Sao Thổ cần khoảng 29,5 năm để quay về vị trí lúc bạn sinh. Giai đoạn này thường được gắn với bước ngoặt trưởng thành.'],
      ['Bản đồ sao cá nhân (natal chart) được lập từ những thông tin nào?','Ngày, giờ và nơi sinh',['Chỉ ngày sinh','Ngày sinh và tên','Năm sinh và nhóm máu'],'Ba thông tin này cho biết chính xác bầu trời trông thế nào vào khoảnh khắc bạn chào đời.'],
      ['Người sinh "cusp" là người như thế nào?','Sinh sát ranh giới giữa hai cung',['Sinh đúng ngày rằm','Có cung Mặt Trời và cung Mọc giống nhau','Sinh vào năm nhuận'],'Người sinh cusp thường được nói là mang nét của cả hai cung, dù về mặt kỹ thuật Mặt Trời chỉ ở một cung.'],
      ['Đường hoàng đạo (ecliptic) là gì?','Đường đi biểu kiến của Mặt Trời trên bầu trời trong một năm',['Quỹ đạo của Mặt Trăng','Đường xích đạo của Trái Đất','Dải Ngân Hà'],'12 cung là 12 đoạn bằng nhau trên đường này.'],
      ['Chiêm tinh phương Tây phổ biến chia cung theo mốc nào?','Các mùa, bắt đầu từ điểm xuân phân',['Vị trí thật của các chòm sao','Pha Mặt Trăng','Lịch âm'],'Đây là hoàng đạo nhiệt đới. Vì vậy Bạch Dương luôn bắt đầu vào khoảng 21/3.'],
      ['Chiêm tinh Ấn Độ (Vedic) dùng hệ hoàng đạo nào?','Hoàng đạo thiên văn, bám theo chòm sao thật',['Hoàng đạo nhiệt đới như phương Tây','Hệ 12 con giáp','Hệ 28 tú'],'Do khác hệ, cung Mặt Trời của một người theo Vedic thường lùi khoảng một cung so với phương Tây.'],
      ['Cung nào là cung cuối cùng (thứ 12) của vòng hoàng đạo?','Song Ngư',['Ma Kết','Bảo Bình','Bọ Cạp'],'Song Ngư khép lại vòng, sau đó Mặt Trời trở lại Bạch Dương.']
    ],
    'ngay-sinh': [
      ['Người sinh ngày Valentine 14/2 thuộc cung nào?','Bảo Bình',['Song Ngư','Ma Kết','Bạch Dương'],'Bảo Bình từ 20/1 đến 18/2. Song Ngư bắt đầu từ 19/2.'],
      ['Người sinh ngày Quốc tế Phụ nữ 8/3 thuộc cung nào?','Song Ngư',['Bạch Dương','Bảo Bình','Kim Ngưu'],'Song Ngư từ 19/2 đến 20/3.'],
      ['Người sinh ngày Giáng sinh 25/12 thuộc cung nào?','Ma Kết',['Nhân Mã','Bảo Bình','Bọ Cạp'],'Ma Kết bắt đầu từ 22/12.'],
      ['Người sinh ngày Quốc khánh 2/9 thuộc cung nào?','Xử Nữ',['Sư Tử','Thiên Bình','Bọ Cạp'],'Xử Nữ từ 23/8 đến 22/9.'],
      ['Người sinh ngày Tết Dương lịch 1/1 thuộc cung nào?','Ma Kết',['Bảo Bình','Nhân Mã','Song Ngư'],'Ma Kết kéo dài từ 22/12 đến 19/1.'],
      ['Người sinh ngày Quốc tế Thiếu nhi 1/6 thuộc cung nào?','Song Tử',['Kim Ngưu','Cự Giải','Sư Tử'],'Song Tử từ 21/5 đến 20/6.'],
      ['Người sinh ngày Nhà giáo Việt Nam 20/11 thuộc cung nào?','Bọ Cạp',['Nhân Mã','Thiên Bình','Ma Kết'],'Bọ Cạp từ 23/10 đến 21/11, Nhân Mã bắt đầu từ 22/11.'],
      ['Người sinh ngày Cá tháng Tư 1/4 thuộc cung nào?','Bạch Dương',['Kim Ngưu','Song Ngư','Song Tử'],'Bạch Dương từ 21/3 đến 19/4.'],
      ['Người sinh ngày Halloween 31/10 thuộc cung nào?','Bọ Cạp',['Thiên Bình','Nhân Mã','Xử Nữ'],'Bọ Cạp bắt đầu từ 23/10.'],
      ['Người sinh ngày 30/4 thuộc cung nào?','Kim Ngưu',['Bạch Dương','Song Tử','Cự Giải'],'Kim Ngưu từ 20/4 đến 20/5.'],
      ['Người sinh ngày 29/2 (năm nhuận) thuộc cung nào?','Song Ngư',['Bảo Bình','Bạch Dương','Ma Kết'],'29/2 nằm trong khoảng 19/2 – 20/3 của Song Ngư.'],
      ['Tháng 7 dương lịch có những cung nào?','Cự Giải và Sư Tử',['Song Tử và Cự Giải','Sư Tử và Xử Nữ','Chỉ có Cự Giải'],'Cự Giải kết thúc 22/7, Sư Tử bắt đầu 23/7.'],
      ['Tháng 12 dương lịch có những cung nào?','Nhân Mã và Ma Kết',['Bọ Cạp và Nhân Mã','Ma Kết và Bảo Bình','Chỉ có Nhân Mã'],'Nhân Mã kết thúc 21/12, Ma Kết bắt đầu 22/12.'],
      ['Cung nào kéo dài qua năm mới dương lịch?','Ma Kết',['Nhân Mã','Bảo Bình','Song Ngư'],'Ma Kết bắt đầu 22/12 năm trước và kết thúc 19/1 năm sau.']
    ],
    'bieu-tuong': [
      ['Cung nào có biểu tượng là một đồ vật, không phải người hay con vật?','Thiên Bình',['Bảo Bình','Song Tử','Xử Nữ'],'Thiên Bình là cái cân. Các cung khác đều là người, con vật hoặc sinh vật huyền thoại.'],
      ['Ba cung nào có biểu tượng hoàn toàn là con người?','Song Tử, Xử Nữ, Bảo Bình',['Song Tử, Nhân Mã, Bảo Bình','Xử Nữ, Thiên Bình, Song Ngư','Bạch Dương, Song Tử, Xử Nữ'],'Nhân Mã chỉ là nửa người nửa ngựa nên không tính.'],
      ['Cung nào có biểu tượng là sinh vật nửa người nửa ngựa?','Nhân Mã',['Ma Kết','Song Tử','Sư Tử'],'Nhân Mã giương cung nhắm lên cao, tượng trưng cho khát vọng khám phá.'],
      ['Ký hiệu ♈ của Bạch Dương được cho là mô phỏng hình gì?','Cặp sừng cừu',['Ngọn lửa','Mũi tên','Hai cánh chim'],'Hai đường cong của ♈ giống cặp sừng xoắn của con cừu đực.'],
      ['Ký hiệu ♉ của Kim Ngưu mô phỏng hình gì?','Đầu bò có sừng',['Hai con cá','Vầng trăng khuyết','Chiếc bình'],'Hình tròn là đầu bò, nét cong phía trên là cặp sừng.'],
      ['Ký hiệu ♒ (hai đường lượn sóng) của Bảo Bình tượng trưng cho gì?','Dòng nước hoặc sóng',['Hai con rắn','Đôi cánh','Ngọn núi'],'Ký hiệu thể hiện dòng nước mà người mang bình rót xuống.'],
      ['Ký hiệu ♐ của Nhân Mã có hình gì?','Mũi tên chéo',['Cây đinh ba','Cái cân','Ngôi sao'],'Mũi tên chỉ lên cao, giống cây cung của nhân mã.'],
      ['Hai con cá của Song Ngư được nối với nhau bằng gì?','Một sợi dây',['Một chiếc vòng vàng','Một nhánh san hô','Không nối với nhau'],'Hai con cá bơi ngược chiều nhưng bị buộc vào nhau, thể hiện tính hai mặt.'],
      ['Con dê biển của Ma Kết có nửa thân dưới là gì?','Đuôi cá',['Chân ngựa','Đuôi rắn','Cánh chim'],'Ma Kết vừa leo núi vừa lặn sâu, tượng trưng cho tham vọng và sự bền bỉ.'],
      ['Trinh nữ của Xử Nữ thường cầm vật gì?','Bó lúa',['Cái cân','Bình nước','Cây đàn'],'Bó lúa gắn với mùa gặt, đúng thời điểm cuối hè của Xử Nữ.']
    ],
    'tinh-cach': [
      ['Cung nào hay bị trêu là "đánh nhau trước, hỏi chuyện sau"?','Bạch Dương',['Thiên Bình','Song Ngư','Kim Ngưu'],'Bạch Dương thuộc Lửa, Thống lĩnh: hành động nhanh, thích đi đầu.'],
      ['Cung nào nổi tiếng "khó chọn món ăn nhất" vì cân nhắc mãi?','Thiên Bình',['Bạch Dương','Ma Kết','Bọ Cạp'],'Thiên Bình muốn cân bằng mọi lựa chọn nên thường lưỡng lự.'],
      ['Nhóm nguyên tố nào thường được gắn với cảm xúc và trực giác?','Nước',['Lửa','Đất','Khí'],'Cự Giải, Bọ Cạp và Song Ngư đều được mô tả là sống tình cảm, nhạy cảm.'],
      ['Nhóm nguyên tố nào thường được gắn với sự thực tế và ổn định?','Đất',['Khí','Nước','Lửa'],'Kim Ngưu, Xử Nữ và Ma Kết thích những gì cụ thể, chắc chắn.'],
      ['Nhóm nguyên tố nào thường được gắn với tư duy và giao tiếp?','Khí',['Đất','Nước','Lửa'],'Song Tử, Thiên Bình và Bảo Bình sống nhiều bằng ý tưởng và trò chuyện.'],
      ['Nhóm nguyên tố nào thường được gắn với nhiệt huyết và hành động?','Lửa',['Nước','Khí','Đất'],'Bạch Dương, Sư Tử và Nhân Mã nhiều năng lượng, thích dẫn dắt.'],
      ['Nhóm Cố định (Kim Ngưu, Sư Tử, Bọ Cạp, Bảo Bình) có nét chung nào?','Kiên định, khó thay đổi',['Thích khởi xướng','Dễ thích nghi','Hay đổi ý'],'Các cung Cố định nằm giữa mỗi mùa, giữ vững những gì đã bắt đầu.'],
      ['Nhóm Biến đổi (Song Tử, Xử Nữ, Nhân Mã, Song Ngư) có nét chung nào?','Linh hoạt, dễ thích nghi',['Cứng đầu','Thích làm lãnh đạo','Ngại giao tiếp'],'Các cung Biến đổi nằm cuối mỗi mùa, chuẩn bị chuyển sang mùa mới.'],
      ['Nhóm Thống lĩnh (Bạch Dương, Cự Giải, Thiên Bình, Ma Kết) có nét chung nào?','Thích khởi xướng, mở đầu',['Thích theo sau','Giỏi duy trì','Hay mơ mộng'],'Các cung Thống lĩnh mở đầu bốn mùa nên được gắn với tinh thần tiên phong.']
    ],
    'nguyen-to': [
      ['Mỗi nguyên tố có bao nhiêu cung?','3',['2','4','6'],'4 nguyên tố × 3 cung = 12 cung.'],
      ['Mỗi nhóm tính chất (Thống lĩnh, Cố định, Biến đổi) có bao nhiêu cung?','4',['3','2','6'],'3 nhóm × 4 cung = 12 cung, mỗi nhóm có đủ 4 nguyên tố.'],
      ['Bộ ba nào thuộc nguyên tố Lửa?','Bạch Dương, Sư Tử, Nhân Mã',['Bạch Dương, Bọ Cạp, Ma Kết','Sư Tử, Thiên Bình, Song Tử','Nhân Mã, Xử Nữ, Song Ngư'],'Ba cung Lửa cách nhau 120°, tạo thành một tam giác trên vòng hoàng đạo.'],
      ['Bộ ba nào thuộc nguyên tố Đất?','Kim Ngưu, Xử Nữ, Ma Kết',['Kim Ngưu, Cự Giải, Bọ Cạp','Xử Nữ, Song Tử, Thiên Bình','Ma Kết, Bảo Bình, Song Ngư'],'Ba cung Đất cách nhau 120°.'],
      ['Bộ ba nào thuộc nguyên tố Khí?','Song Tử, Thiên Bình, Bảo Bình',['Song Tử, Nhân Mã, Song Ngư','Thiên Bình, Bọ Cạp, Nhân Mã','Bảo Bình, Song Ngư, Cự Giải'],'Bảo Bình là cung Khí dù biểu tượng là người mang bình nước.'],
      ['Bộ ba nào thuộc nguyên tố Nước?','Cự Giải, Bọ Cạp, Song Ngư',['Cự Giải, Bảo Bình, Song Ngư','Bọ Cạp, Ma Kết, Song Ngư','Song Ngư, Bạch Dương, Kim Ngưu'],'Bảo Bình không thuộc nhóm Nước dù tên gọi có chữ "bình nước".'],
      ['Nhóm Cố định gồm những cung nào?','Kim Ngưu, Sư Tử, Bọ Cạp, Bảo Bình',['Bạch Dương, Cự Giải, Thiên Bình, Ma Kết','Song Tử, Xử Nữ, Nhân Mã, Song Ngư','Kim Ngưu, Xử Nữ, Ma Kết, Bảo Bình'],'Các cung Cố định nằm giữa mỗi mùa.'],
      ['Nhóm Biến đổi gồm những cung nào?','Song Tử, Xử Nữ, Nhân Mã, Song Ngư',['Kim Ngưu, Sư Tử, Bọ Cạp, Bảo Bình','Bạch Dương, Cự Giải, Thiên Bình, Ma Kết','Song Tử, Sư Tử, Nhân Mã, Ma Kết'],'Các cung Biến đổi nằm cuối mỗi mùa.'],
      ['Nhóm Thống lĩnh gồm những cung nào?','Bạch Dương, Cự Giải, Thiên Bình, Ma Kết',['Kim Ngưu, Sư Tử, Bọ Cạp, Bảo Bình','Song Tử, Xử Nữ, Nhân Mã, Song Ngư','Bạch Dương, Sư Tử, Nhân Mã, Ma Kết'],'Bốn cung này mở đầu bốn mùa.'],
      ['Mặt Trời đi vào cung Cự Giải vào dịp nào?','Hạ chí',['Xuân phân','Thu phân','Đông chí'],'Bốn cung Thống lĩnh mở đầu bốn mùa: Bạch Dương (xuân phân), Cự Giải (hạ chí), Thiên Bình (thu phân), Ma Kết (đông chí).'],
      ['Thu phân (khoảng 23/9) là lúc Mặt Trời đi vào cung nào?','Thiên Bình',['Xử Nữ','Bọ Cạp','Nhân Mã'],'Thu phân là lúc ngày và đêm dài bằng nhau, hợp với biểu tượng cái cân.'],
      ['Đông chí (khoảng 22/12) là lúc Mặt Trời đi vào cung nào?','Ma Kết',['Nhân Mã','Bảo Bình','Song Ngư'],'Đông chí có đêm dài nhất năm ở Bắc bán cầu.'],
      ['Xuân phân (khoảng 21/3) là lúc Mặt Trời đi vào cung nào?','Bạch Dương',['Song Ngư','Kim Ngưu','Bảo Bình'],'Vì vậy Bạch Dương được xem là cung mở đầu vòng hoàng đạo.'],
      ['Hai nguyên tố nào được xếp vào nhóm "dương" (hướng ngoại)?','Lửa và Khí',['Đất và Nước','Lửa và Đất','Khí và Nước'],'Cung Lửa và Khí xen kẽ với cung Đất và Nước (nhóm "âm") trên vòng hoàng đạo.'],
      ['Hai nguyên tố nào được xếp vào nhóm "âm" (hướng nội)?','Đất và Nước',['Lửa và Khí','Khí và Nước','Lửa và Đất'],'Kim Ngưu, Cự Giải, Xử Nữ, Bọ Cạp, Ma Kết, Song Ngư là các cung âm.'],
      ['Hai cung đứng cạnh nhau trên vòng hoàng đạo có thể cùng nguyên tố không?','Không bao giờ',['Luôn luôn','Chỉ với cung Nước','Chỉ vào năm nhuận'],'Thứ tự nguyên tố lặp lại đều đặn: Lửa, Đất, Khí, Nước, Lửa…'],
      ['Thứ tự nguyên tố lặp lại quanh vòng hoàng đạo, bắt đầu từ Bạch Dương, là gì?','Lửa, Đất, Khí, Nước',['Lửa, Nước, Đất, Khí','Đất, Lửa, Nước, Khí','Khí, Lửa, Đất, Nước'],'Bạch Dương (Lửa), Kim Ngưu (Đất), Song Tử (Khí), Cự Giải (Nước), rồi lặp lại.']
    ],
    'chu-tinh': [
      ['Kim Ngưu và Thiên Bình cùng do hành tinh nào chủ quản?','Sao Kim',['Sao Thủy','Mặt Trăng','Sao Mộc'],'Sao Kim (Venus) là hành tinh của tình yêu và cái đẹp.'],
      ['Song Tử và Xử Nữ cùng do hành tinh nào chủ quản?','Sao Thủy',['Sao Kim','Sao Thổ','Sao Hỏa'],'Sao Thủy (Mercury) gắn với tư duy và giao tiếp.'],
      ['Theo chiêm tinh cổ điển, Sao Hỏa chủ quản hai cung nào?','Bạch Dương và Bọ Cạp',['Bạch Dương và Sư Tử','Sư Tử và Nhân Mã','Bọ Cạp và Ma Kết'],'Ngày nay Bọ Cạp được gán thêm cho Sao Diêm Vương.'],
      ['Theo chiêm tinh cổ điển, Sao Mộc chủ quản hai cung nào?','Nhân Mã và Song Ngư',['Nhân Mã và Sư Tử','Song Ngư và Cự Giải','Ma Kết và Bảo Bình'],'Ngày nay Song Ngư được gán thêm cho Sao Hải Vương.'],
      ['Theo chiêm tinh cổ điển, Sao Thổ chủ quản hai cung nào?','Ma Kết và Bảo Bình',['Ma Kết và Kim Ngưu','Bảo Bình và Song Ngư','Xử Nữ và Ma Kết'],'Ngày nay Bảo Bình được gán thêm cho Sao Thiên Vương.'],
      ['Mặt Trời và Mặt Trăng lần lượt chủ quản cung nào?','Sư Tử và Cự Giải',['Bạch Dương và Thiên Bình','Song Tử và Song Ngư','Ma Kết và Bảo Bình'],'Mặt Trời chủ quản Sư Tử, Mặt Trăng chủ quản Cự Giải. Mỗi thiên thể này chỉ chủ quản một cung.'],
      ['Trong chiêm tinh, Sao Kim gắn với lĩnh vực nào?','Tình yêu, cái đẹp và tiền bạc',['Chiến tranh và xung đột','Kỷ luật và thời gian','Giao tiếp và học tập'],'Sao Kim mang tên nữ thần tình yêu Venus.'],
      ['Trong chiêm tinh, Sao Hỏa gắn với điều gì?','Hành động, ham muốn và xung đột',['Tình yêu và hòa hợp','May mắn và mở rộng','Cảm xúc và gia đình'],'Sao Hỏa mang tên thần chiến tranh Mars.'],
      ['Trong chiêm tinh, Sao Mộc thường gắn với điều gì?','May mắn và sự mở rộng',['Giới hạn và trách nhiệm','Bí mật và biến đổi','Giao tiếp và đi lại'],'Sao Mộc là hành tinh lớn nhất, được gọi là "đại cát tinh".'],
      ['Trong chiêm tinh, Sao Thổ thường gắn với điều gì?','Kỷ luật, giới hạn và thời gian',['Niềm vui và may mắn','Sáng tạo và nghệ thuật','Tình yêu lãng mạn'],'Sao Thổ mang tên thần thời gian Saturn (Kronos).'],
      ['Trong chiêm tinh, Mặt Trăng tượng trưng cho điều gì?','Cảm xúc và nhu cầu bên trong',['Ý chí và bản ngã','Lý trí và tư duy','Sự nghiệp'],'Cung Mặt Trăng nói về cách bạn cảm nhận và cần được an ủi.'],
      ['Trong chiêm tinh, Mặt Trời tượng trưng cho điều gì?','Bản ngã và sức sống',['Cảm xúc thầm kín','Các mối quan hệ','Tiềm thức'],'Đó là lý do cung Mặt Trời được xem là "cung chính" của mỗi người.'],
      ['Có bao nhiêu thiên thể "cổ điển" được dùng trong chiêm tinh trước khi có kính viễn vọng?','7',['5','9','12'],'Mặt Trời, Mặt Trăng, Sao Thủy, Sao Kim, Sao Hỏa, Sao Mộc, Sao Thổ. Đây cũng là gốc tên các ngày trong tuần ở nhiều thứ tiếng.'],
      ['Sao Thiên Vương, hành tinh chủ quản hiện đại của Bảo Bình, được phát hiện năm nào?','1781',['1610','1846','1930'],'William Herschel phát hiện Sao Thiên Vương năm 1781.'],
      ['Sao Hải Vương, chủ tinh hiện đại của Song Ngư, được phát hiện năm nào?','1846',['1781','1930','1700'],'Sao Hải Vương được tìm ra nhờ tính toán toán học trước khi quan sát thấy.'],
      ['Sao Diêm Vương, chủ tinh hiện đại của Bọ Cạp, được phát hiện năm nào?','1930',['1846','1781','1977'],'Clyde Tombaugh phát hiện Sao Diêm Vương năm 1930. Năm 2006 nó bị xếp lại thành hành tinh lùn, nhưng chiêm tinh vẫn dùng.'],
      ['Tên Sao Thủy trong tiếng Anh, Mercury, là tên của vị thần nào?','Thần đưa tin',['Thần chiến tranh','Thần biển','Thần nông nghiệp'],'Mercury (Hermes) là sứ giả nhanh nhẹn của các thần, hợp với vai trò giao tiếp.']
    ],
    'than-thoai': [
      ['Kim Ngưu gắn với vị thần nào hóa thành bò trắng?','Zeus',['Poseidon','Apollo','Hermes'],'Zeus hóa thành bò trắng để đưa nàng Europa vượt biển đến đảo Crete.'],
      ['Châu Âu (Europe) được đặt theo tên nàng công chúa nào trong truyện Kim Ngưu?','Europa',['Helen','Andromeda','Persephone'],'Zeus hóa bò trắng đưa Europa sang đảo Crete.'],
      ['Cặp song sinh trong cung Song Tử là ai?','Castor và Pollux',['Romulus và Remus','Apollo và Artemis','Hypnos và Thanatos'],'Hai sao sáng nhất chòm Song Tử mang tên hai anh em.'],
      ['Trong cặp Song Tử, ai là người bất tử?','Pollux',['Castor','Cả hai','Không ai'],'Khi Castor chết, Pollux xin chia sự bất tử với anh. Zeus đặt cả hai lên trời.'],
      ['Con cừu của Bạch Dương nổi tiếng với điều gì?','Bộ lông bằng vàng',['Biết nói tiếng người','Có đôi cánh bạc','Sống ở đáy biển'],'Bộ lông cừu vàng sau này là mục tiêu chuyến đi của Jason và các Argonaut.'],
      ['Con cừu vàng của Bạch Dương đã cứu hai anh em nào?','Phrixus và Helle',['Castor và Pollux','Jason và Medea','Orpheus và Eurydice'],'Hai anh em cưỡi cừu bay qua biển để thoát khỏi người mẹ kế.'],
      ['Eo biển nào được đặt tên theo Helle, cô gái rơi khỏi lưng cừu vàng?','Hellespont (Dardanelles)',['Bosphorus','Gibraltar','Messina'],'Helle rơi xuống biển khi bay ngang qua, eo biển mang tên cô.'],
      ['Sư Tử gắn với con sư tử bị anh hùng nào hạ gục?','Heracles',['Perseus','Achilles','Theseus'],'Đó là sư tử Nemea, thử thách đầu tiên trong 12 kỳ công của Heracles.'],
      ['Sư tử Nemea có điểm gì đặc biệt?','Bộ da không vũ khí nào xuyên thủng',['Biết bay','Có ba cái đầu','Thở ra lửa'],'Heracles phải bóp cổ nó, rồi dùng chính móng vuốt của nó để lột da làm áo giáp.'],
      ['Con cua của Cự Giải được nữ thần Hera sai đến để làm gì?','Cản Heracles khi đánh rắn Hydra',['Canh giữ đỉnh Olympus','Bảo vệ con của Poseidon','Đánh thức thần Mặt Trời'],'Con cua kẹp chân Heracles và bị ông giẫm nát. Hera đặt nó lên trời để ghi công.'],
      ['Hai cung nào gắn với các kỳ công của Heracles?','Sư Tử và Cự Giải',['Bạch Dương và Kim Ngưu','Song Tử và Nhân Mã','Bọ Cạp và Ma Kết'],'Sư tử Nemea và con cua của Hera đều xuất hiện trong 12 kỳ công.'],
      ['Theo một truyền thuyết, bọ cạp của cung Bọ Cạp được sai đến để hạ gục ai?','Thợ săn Orion',['Vua Minos','Anh hùng Jason','Thần Ares'],'Vì vậy chòm Orion và chòm Bọ Cạp ở hai phía bầu trời, không bao giờ cùng xuất hiện.'],
      ['Vị thần nửa người nửa dê nào hóa nửa cá khi nhảy xuống sông, tạo nên hình ảnh Ma Kết?','Pan',['Dionysus','Hermes','Priapus'],'Pan nhảy xuống sông để trốn quái vật Typhon, nửa thân trên vẫn là dê, nửa dưới hóa cá.'],
      ['Con dê nào nuôi Zeus bằng sữa khi còn nhỏ, đôi khi được gắn với Ma Kết?','Amalthea',['Io','Callisto','Europa'],'Một chiếc sừng của Amalthea trở thành "sừng dư dật" (cornucopia).'],
      ['Aphrodite và con trai Eros hóa thành cá để trốn quái vật nào, tạo nên Song Ngư?','Typhon',['Medusa','Minotaur','Cerberus'],'Hai mẹ con buộc vào nhau bằng sợi dây để không lạc nhau dưới nước.'],
      ['Chàng trai rót rượu cho các thần trên Olympus, thường gắn với Bảo Bình, là ai?','Ganymede',['Narcissus','Adonis','Icarus'],'Zeus đưa Ganymede lên Olympus. Một mặt trăng của Sao Mộc cũng mang tên chàng.'],
      ['Nữ thần công lý cuối cùng rời bỏ loài người, thường gắn với Xử Nữ, là ai?','Astraea',['Athena','Hera','Nike'],'Cái cân của Thiên Bình bên cạnh cũng thường được xem là cái cân công lý của Astraea.'],
      ['Nhân mã thông thái, thầy của Achilles và nhiều anh hùng, thường được nhắc khi nói về cung Nhân Mã là ai?','Chiron',['Nessus','Pholus','Centaurus'],'Nhiều tài liệu gắn Chiron với cung Nhân Mã, dù một số dị bản cho rằng Chiron là chòm Bán Nhân Mã (Centaurus).'],
      ['Cung Song Tử ở Babylon cổ đại được gọi là gì?','Cặp sinh đôi vĩ đại',['Hai con cá','Người làm thuê','Con bò của trời'],'Hình tượng anh em song sinh đã có từ thời Babylon trước khi người Hy Lạp gắn với Castor và Pollux.']
    ],
    'thien-van': [
      ['Mặt Trời thực tế đi qua bao nhiêu chòm sao trên đường hoàng đạo?','13',['12','11','14'],'Chòm thứ 13 là Xà Phu (Ophiuchus), nằm giữa Bọ Cạp và Nhân Mã.'],
      ['Chòm sao Xà Phu (Ophiuchus) nằm giữa hai chòm nào?','Bọ Cạp và Nhân Mã',['Song Ngư và Bạch Dương','Xử Nữ và Thiên Bình','Ma Kết và Bảo Bình'],'Mặt Trời đi qua Xà Phu khoảng 29/11 đến 17/12.'],
      ['Hiện tượng nào làm ngày Mặt Trời qua chòm sao thật lệch khoảng 1 tháng so với cung chiêm tinh?','Tuế sai (trục Trái Đất lắc chậm)',['Năm nhuận','Nhật thực','Mặt Trăng kéo Trái Đất lại gần'],'Trục Trái Đất xoay như con quay đang chậm dần, làm điểm xuân phân dịch dần theo thời gian.'],
      ['Một chu kỳ tuế sai kéo dài khoảng bao lâu?','Khoảng 26.000 năm',['Khoảng 2.000 năm','Khoảng 365 năm','Khoảng 100.000 năm'],'Điểm xuân phân đi lùi khoảng 1 cung sau mỗi 2.150 năm.'],
      ['Điểm xuân phân ngày nay nằm trong chòm sao nào?','Song Ngư',['Bạch Dương','Bảo Bình','Kim Ngưu'],'Nó đang dịch dần về phía Bảo Bình, nên mới có cụm từ "Kỷ nguyên Bảo Bình".'],
      ['Ngôi sao Antares của chòm Bọ Cạp có màu gì nổi bật?','Đỏ',['Xanh lam','Trắng','Vàng'],'Tên Antares nghĩa là "đối thủ của Ares" (Sao Hỏa), vì màu đỏ giống Sao Hỏa.'],
      ['Tên sao Regulus của chòm Sư Tử nghĩa là gì?','Vị vua nhỏ',['Trái tim lửa','Con mắt đỏ','Ngôi sao phương Bắc'],'Regulus nằm ở vị trí trái tim của con sư tử.'],
      ['Sao Aldebaran được gọi là "con mắt" của con vật nào?','Con bò (Kim Ngưu)',['Con sư tử','Con bọ cạp','Con dê'],'Aldebaran màu cam đỏ, nằm ở mắt của chòm Kim Ngưu.'],
      ['Cụm sao Thất Nữ (Pleiades) nằm trong chòm sao nào?','Kim Ngưu',['Song Tử','Bạch Dương','Xử Nữ'],'Thất Nữ là một trong những cụm sao dễ thấy nhất bằng mắt thường.'],
      ['Cụm sao Tổ Ong (M44) nằm trong chòm sao nào?','Cự Giải',['Sư Tử','Song Tử','Song Ngư'],'Tổ Ong là điểm nhìn rõ nhất trong chòm Cự Giải vốn khá mờ.'],
      ['Tinh vân Con Cua (M1) nằm ở chòm sao nào?','Kim Ngưu',['Cự Giải','Bọ Cạp','Song Ngư'],'Dù tên là Con Cua, tinh vân này nằm gần sừng của Kim Ngưu. Nó là tàn tích của một siêu tân tinh năm 1054.'],
      ['Tâm của dải Ngân Hà nằm theo hướng chòm sao nào?','Nhân Mã',['Bọ Cạp','Song Tử','Thiên Bình'],'Lỗ đen siêu nặng Sagittarius A* ở tâm Ngân Hà mang tên chòm này.'],
      ['Chòm sao hoàng đạo nào lớn nhất trên bầu trời?','Xử Nữ',['Sư Tử','Song Ngư','Bảo Bình'],'Xử Nữ là chòm sao lớn thứ hai trong 88 chòm sao, chỉ sau Trường Xà.'],
      ['Chòm sao hoàng đạo nào nhỏ nhất?','Ma Kết',['Cự Giải','Bạch Dương','Thiên Bình'],'Ma Kết là chòm nhỏ nhất trong 12 chòm hoàng đạo.'],
      ['Mưa sao băng Song Tử (Geminids) đạt cực đại vào tháng mấy?','Tháng 12',['Tháng 8','Tháng 4','Tháng 10'],'Geminids cực đại khoảng 13–14/12, là một trong những trận mưa sao băng đẹp nhất năm.'],
      ['Mưa sao băng Sư Tử (Leonids) đạt cực đại vào tháng mấy?','Tháng 11',['Tháng 12','Tháng 8','Tháng 1'],'Leonids cực đại khoảng giữa tháng 11, nổi tiếng với các trận "bão sao băng" năm 1833, 1966.'],
      ['Mưa sao băng Eta Aquariids (Bảo Bình) sinh ra từ bụi của sao chổi nào?','Sao chổi Halley',['Sao chổi Hale-Bopp','Sao chổi Swift-Tuttle','Sao chổi Tempel-Tuttle'],'Sao chổi Halley để lại hai trận mưa sao băng: Eta Aquariids (tháng 5) và Orionids (tháng 10).'],
      ['Thiên Bình xưa kia từng được xem là bộ phận nào của chòm Bọ Cạp?','Đôi càng',['Cái đuôi','Trái tim','Đôi mắt'],'Tên hai sao sáng của Thiên Bình, Zubenelgenubi và Zubeneschamali, nghĩa là "càng phía nam" và "càng phía bắc".'],
      ['Có bao nhiêu chòm sao chính thức trên toàn bầu trời?','88',['12','48','100'],'Hiệp hội Thiên văn Quốc tế công nhận 88 chòm sao, 12 trong số đó là chòm hoàng đạo truyền thống.']
    ],
    'nha-goc': [
      ['Có bao nhiêu nhà trong bản đồ sao?','12',['8','10','4'],'12 nhà chia bầu trời quanh nơi bạn sinh, mỗi nhà ứng với một lĩnh vực cuộc sống.'],
      ['Cung Mọc (Ascendant) nằm ở điểm bắt đầu của nhà nào?','Nhà 1',['Nhà 4','Nhà 7','Nhà 10'],'Cung Mọc mở đầu nhà 1, nhà của bản thân và ngoại hình.'],
      ['Thiên đỉnh (MC) nằm ở điểm bắt đầu của nhà nào?','Nhà 10',['Nhà 1','Nhà 4','Nhà 7'],'MC là điểm cao nhất của bầu trời, gắn với sự nghiệp và danh tiếng.'],
      ['Điểm Lặn (Descendant), đối diện cung Mọc, mở đầu nhà nào?','Nhà 7',['Nhà 1','Nhà 10','Nhà 12'],'Nhà 7 là nhà của hôn nhân và đối tác, đối diện với "bản thân" ở nhà 1.'],
      ['Nhà nào thường được xem là nhà của sự nghiệp?','Nhà 10',['Nhà 2','Nhà 6','Nhà 12'],'Nhà 10 gắn với công danh, vị trí xã hội, tương ứng tự nhiên với Ma Kết.'],
      ['Nhà nào thường được xem là nhà của hôn nhân?','Nhà 7',['Nhà 5','Nhà 8','Nhà 11'],'Nhà 7 nói về các mối quan hệ cam kết một-một, tương ứng với Thiên Bình.'],
      ['Góc chiếu "hội tụ" (conjunction) là khi hai hành tinh cách nhau bao nhiêu độ?','0°',['60°','90°','180°'],'Hai hành tinh nằm gần như cùng một chỗ, năng lượng hòa vào nhau.'],
      ['Góc chiếu "lục hợp" (sextile) bằng bao nhiêu độ?','60°',['30°','90°','120°'],'Lục hợp là góc hài hòa nhẹ, thường nối hai cung Lửa–Khí hoặc Đất–Nước.'],
      ['Góc chiếu "vuông" (square) bằng bao nhiêu độ?','90°',['60°','120°','150°'],'Góc vuông tạo căng thẳng, thúc đẩy hành động và thay đổi.'],
      ['Góc chiếu "tam hợp" (trine) bằng bao nhiêu độ?','120°',['90°','60°','180°'],'Tam hợp là góc hài hòa nhất, thường nối các cung cùng nguyên tố.'],
      ['Góc chiếu "đối đỉnh" (opposition) bằng bao nhiêu độ?','180°',['90°','120°','150°'],'Hai hành tinh nằm ở hai cung đối diện, tạo cảm giác giằng co cần cân bằng.'],
      ['Góc chiếu nào thường được xem là hài hòa nhất?','Tam hợp (120°)',['Vuông (90°)','Đối đỉnh (180°)','Bán vuông (45°)'],'Tam hợp nối các cung cùng nguyên tố nên năng lượng chảy dễ dàng.'],
      ['Hai cung cách nhau 120° thường có điểm chung gì?','Cùng nguyên tố',['Cùng tính chất','Cùng chủ tinh','Đối diện nhau'],'Ví dụ Bạch Dương, Sư Tử và Nhân Mã cách nhau 120° và đều thuộc Lửa.'],
      ['Hai cung cách nhau 90° thường có điểm chung gì?','Cùng nhóm tính chất',['Cùng nguyên tố','Cùng chủ tinh','Không có gì chung'],'Ví dụ Bạch Dương và Cự Giải cách 90°, đều là cung Thống lĩnh nhưng khác nguyên tố.'],
      ['Hai cung đối diện nhau (180°) luôn có điểm chung gì?','Cùng nhóm tính chất',['Cùng nguyên tố','Cùng chủ tinh','Cùng mùa'],'Ví dụ Bạch Dương và Thiên Bình đều là Thống lĩnh. Nguyên tố của chúng bổ trợ nhau (Lửa–Khí, Đất–Nước).'],
      ['Góc "bất tương hợp" (quincunx) bằng bao nhiêu độ?','150°',['135°','45°','30°'],'Hai cung cách 150° khác cả nguyên tố lẫn tính chất, thường cần điều chỉnh để hòa hợp.']
    ],
    'lich-su': [
      ['Hệ thống 12 cung hoàng đạo bắt nguồn từ nền văn minh nào?','Babylon (Lưỡng Hà)',['Ai Cập','Hy Lạp','Ấn Độ'],'Người Babylon chia hoàng đạo thành 12 phần khoảng thế kỷ 5 TCN, sau đó người Hy Lạp tiếp nhận.'],
      ['"Tetrabiblos", cuốn sách chiêm tinh nổi tiếng thời cổ đại, do ai viết?','Ptolemy',['Aristotle','Pythagoras','Galileo'],'Claudius Ptolemy viết Tetrabiblos vào thế kỷ 2, ảnh hưởng chiêm tinh phương Tây suốt hơn 1.000 năm.'],
      ['Tên Hán Việt "Bạch Dương" có nghĩa là gì?','Con cừu trắng',['Cây dương trắng','Ánh dương rực rỡ','Đại dương trắng'],'Bạch là trắng, dương (羊) là con dê, con cừu.'],
      ['Tên Hán Việt "Kim Ngưu" có nghĩa là gì?','Con bò vàng',['Sao vàng','Trâu sắt','Con bò thần'],'Kim là vàng, ngưu là trâu, bò.'],
      ['Tên Hán Việt "Cự Giải" có nghĩa là gì?','Con cua lớn',['Con tôm hùm','Con rùa lớn','Vỏ sò khổng lồ'],'Cự là to lớn, giải (蟹) là con cua.'],
      ['"Thiên Yết" hay "Hổ Cáp" là tên gọi khác của cung nào?','Bọ Cạp',['Nhân Mã','Ma Kết','Song Ngư'],'Yết (蠍) là con bọ cạp.'],
      ['"Nam Dương" là tên gọi khác của cung nào?','Ma Kết',['Bạch Dương','Song Ngư','Bảo Bình'],'Ma Kết là chòm sao ở phía nam, biểu tượng là con dê.'],
      ['"Xạ Thủ" là tên gọi khác của cung nào?','Nhân Mã',['Song Tử','Bạch Dương','Sư Tử'],'Xạ thủ nghĩa là người bắn cung, đúng với hình nhân mã giương cung.'],
      ['"Thất Nữ" là tên gọi khác của cung nào?','Xử Nữ',['Song Ngư','Thiên Bình','Song Tử'],'Cả Xử Nữ và Thất Nữ đều chỉ người con gái chưa chồng.'],
      ['"Thủy Bình" là tên gọi khác của cung nào?','Bảo Bình',['Song Ngư','Cự Giải','Thiên Bình'],'Thủy bình là bình nước, đúng hình người mang bình nước.'],
      ['Ca khúc "Aquarius" nói về "Kỷ nguyên Bảo Bình" thuộc vở nhạc kịch nào?','Hair',['Cats','Grease','Mamma Mia!'],'Vở nhạc kịch Hair (1967) đưa cụm từ "Age of Aquarius" trở nên nổi tiếng toàn cầu.'],
      ['Mục tử vi theo cung Mặt Trời trên báo chí bắt đầu phổ biến từ thập niên nào?','Thập niên 1930',['Thập niên 1880','Thập niên 1960','Thập niên 1990'],'Năm 1930, một tờ báo Anh đăng lá số của công chúa Margaret mới sinh và được độc giả hưởng ứng mạnh.'],
      ['Trong hình "người hoàng đạo" thời Trung Cổ, các cung được xếp theo thứ tự nào trên cơ thể?','Từ đầu (Bạch Dương) xuống chân (Song Ngư)',['Từ chân lên đầu','Từ trái sang phải','Ngẫu nhiên'],'Thứ tự trên cơ thể trùng với thứ tự của vòng hoàng đạo.'],
      ['Tên các ngày trong tuần ở nhiều ngôn ngữ châu Âu bắt nguồn từ đâu?','7 thiên thể cổ điển',['12 cung hoàng đạo','12 vị thần Olympus','Các vị vua La Mã'],'Ví dụ Sunday (Mặt Trời), Monday (Mặt Trăng), Saturday (Sao Thổ).'],
      ['Chiêm tinh và thiên văn học bắt đầu tách thành hai lĩnh vực riêng vào khoảng thời gian nào?','Thế kỷ 17–18',['Thế kỷ 2','Thế kỷ 10','Thế kỷ 20'],'Trước đó nhiều nhà thiên văn như Kepler vẫn lập lá số chiêm tinh.']
    ]
  };
  Object.entries(HAND).forEach(([c, list]) => list.forEach(([q, a, w, e]) => add(c, q, a, w, e)));

  window.ZQUIZ = { cats: CATS, questions: Q };
})();
