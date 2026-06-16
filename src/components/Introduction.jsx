import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake, faBolt, faShieldHalved, faUsers, faQuoteLeft,
  faCheckCircle, faAward, faTruckFast, faScrewdriverWrench, faGears,
} from '@fortawesome/free-solid-svg-icons';
import { useAdmin } from '../context/AdminContext';
import { T } from '../theme';

const VALUES = [
  { icon: faHandshake, title: 'Tận Tâm', desc: 'Luôn đặt lợi ích khách hàng lên hàng đầu, tư vấn trung thực.' },
  { icon: faBolt, title: 'Nhanh Chóng', desc: 'Xử lý sự cố nhanh, có mặt tận nơi trong vòng 2 giờ.' },
  { icon: faShieldHalved, title: 'Uy Tín', desc: 'Cam kết chất lượng, bảo hành đầy đủ sau mỗi dịch vụ.' },
  { icon: faUsers, title: 'Chuyên Nghiệp', desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, đào tạo bài bản.' },
];

const COMMITMENTS = [
  { icon: faAward, title: 'Sản phẩm chính hãng', desc: 'Cam kết 100% hàng chính hãng, có nguồn gốc xuất xứ rõ ràng, đầy đủ giấy tờ kiểm định.' },
  { icon: faScrewdriverWrench, title: 'Bảo hành chu đáo', desc: 'Chính sách bảo hành 6–12 tháng, hỗ trợ kỹ thuật trọn đời sản phẩm.' },
  { icon: faTruckFast, title: 'Giao hàng nhanh', desc: 'Giao hàng toàn quốc, lắp đặt và hướng dẫn sử dụng tận nơi miễn phí trong nội thành.' },
  { icon: faGears, title: 'Linh kiện sẵn có', desc: 'Kho linh kiện loadcell, đầu cân, mạch hiển thị đa dạng, thay thế nhanh chóng.' },
];

const BRANDS = [
  { name: 'VIBRA', sub: 'Japan', color: '#c8102e' },
  { name: 'A&D', sub: 'Japan', color: '#003da5' },
  { name: 'JADEVER', sub: 'Taiwan', color: '#0066b3' },
  { name: 'CAS', sub: 'Korea', color: '#e30613' },
  { name: 'OHAUS', sub: 'USA', color: '#005eb8' },
  { name: 'YAOHUA', sub: 'China', color: '#d2232a' },
];

export default function Introduction() {
  const { siteData } = useAdmin();
  const { stats, company, products } = siteData;
  // Ảnh cân thật từ sản phẩm
  const scaleImg = (i) => products.filter(p => p.image)[i]?.image;

  return (
    <Box>
      {/* Header band */}
      <Box sx={{ background: `linear-gradient(135deg,${T.ink},#102a52)`, color: '#fff', py: { xs: 3.5, md: 5 } }}>
        <Container maxWidth="xl">
          <Typography sx={{ color: T.accentLight, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.6 }}>
            VỀ CÂN ĐIỆN TỬ BÁCH KHOA
          </Typography>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '22px', md: '34px' }, mb: 1.5 }}>
            Đối Tác Tin Cậy Của Bạn
          </Typography>
          <Typography sx={{ opacity: .8, fontSize: { xs: 13, md: 15 }, maxWidth: 640, lineHeight: 1.75 }}>
            Địa chỉ chuyên cung cấp, sửa chữa và bảo trì cân điện tử hàng đầu tại Huế và Đà Nẵng.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* About — 2 cột: text + ảnh */}
        <Grid container spacing={{ xs: 2.5, md: 4 }} alignItems="center" sx={{ mb: { xs: 3, md: 5 } }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: 18, md: 24 }, mb: 2,
              background: T.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>
              Câu Chuyện Của Chúng Tôi
            </Typography>
            <Typography sx={{ fontSize: { xs: 13.5, md: 14.5 }, color: '#2a3441', lineHeight: 1.9, mb: 1.5 }}>
              Với <strong style={{ color: T.brand }}>5+ năm kinh nghiệm</strong> trong lĩnh vực cân điện tử, Cân Điện Tử Bách Khoa
              tự hào là đơn vị uy tín tại miền Trung chuyên cung cấp các loại cân chính hãng từ những thương hiệu hàng đầu như
              VIBRA, A&amp;D, JADEVER, CAS...
            </Typography>
            <Typography sx={{ fontSize: { xs: 13.5, md: 14.5 }, color: '#2a3441', lineHeight: 1.9, mb: 2 }}>
              Chúng tôi không chỉ bán sản phẩm mà còn cung cấp dịch vụ sửa chữa, bảo trì, kiểm định cân tận nơi với đội ngũ
              kỹ thuật viên chuyên nghiệp, đảm bảo cân của bạn luôn hoạt động chính xác và bền bỉ.
            </Typography>
            <Stack spacing={1.2}>
              {['Phục vụ tiểu thương, cửa hàng, siêu thị, nhà máy', 'Hệ thống 2 chi nhánh tại Huế và Đà Nẵng', 'Kỹ thuật viên tận nơi, hỗ trợ nhanh chóng'].map((t, i) => (
                <Stack key={i} direction="row" spacing={1.2} alignItems="center">
                  <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: 16, color: T.brand, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: T.ink, fontWeight: 500 }}>{t}</Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Box component="img"
                src="https://images.pexels.com/photos/8005368/pexels-photo-8005368.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kỹ thuật viên Bách Khoa"
                sx={{ width: '100%', height: { xs: 240, md: 360 }, objectFit: 'cover', borderRadius: 4, display: 'block', boxShadow: '0 16px 48px rgba(15,23,36,.18)' }}
                onError={(e) => { e.target.src = '/banner.png'; }} />
              {/* Floating stat badge */}
              <Box sx={{ position: 'absolute', bottom: { xs: 12, md: -24 }, left: { xs: 12, md: -24 },
                background: T.gradient, color: '#fff', borderRadius: 3, px: 2.5, py: 1.5,
                boxShadow: `0 12px 32px ${T.brand}55` }}>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: 22, md: 28 }, lineHeight: 1 }}>2000+</Typography>
                <Typography sx={{ fontSize: { xs: 11, md: 12.5 }, opacity: .9 }}>Cân đã sửa chữa</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Stats */}
        <Box sx={{ background: T.gradient, borderRadius: 3, p: { xs: 2.5, md: 3.5 }, mb: { xs: 3, md: 5 }, color: '#fff' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {stats.map((s, i) => (
              <Box key={i} sx={{ flex: 1, textAlign: 'center', px: 0.5,
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.25)' : 'none' }}>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: '20px', sm: '26px', md: '34px' }, lineHeight: 1 }}>{s.value}</Typography>
                <Typography sx={{ opacity: .85, fontSize: { xs: '9px', sm: '11px', md: '13px' }, mt: 0.4, lineHeight: 1.2 }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Commitments — 4 cam kết */}
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 4 } }}>
            <Typography sx={{ color: T.brand, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.5 }}>
              CAM KẾT CỦA BÁCH KHOA
            </Typography>
            <Typography sx={{ fontWeight: 800, color: T.ink, fontSize: { xs: '18px', md: '26px' } }}>
              Vì Sự Hài Lòng Của Khách Hàng
            </Typography>
          </Box>
          <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
            {COMMITMENTS.map((c, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Stack direction="row" spacing={2} sx={{ background: T.surface, borderRadius: 3, p: { xs: 2, md: 2.8 },
                  border: `1px solid ${T.line}`, height: '100%',
                  transition: 'all .25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 14px 36px ${T.brand}14`, borderColor: T.brandLight } }}>
                  <Box sx={{ width: 52, height: 52, borderRadius: 3, background: T.gradient, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 20px ${T.brand}40` }}>
                    <FontAwesomeIcon icon={c.icon} style={{ fontSize: 21, color: '#fff' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: 14.5, md: 16 }, mb: 0.6, color: T.ink }}>{c.title}</Typography>
                    <Typography sx={{ fontSize: { xs: 12.5, md: 13.5 }, color: T.inkSoft, lineHeight: 1.65 }}>{c.desc}</Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Brands distributed */}
        <Box sx={{ background: T.surface, borderRadius: 3, p: { xs: 2.5, md: 4 }, mb: { xs: 3, md: 5 }, border: `1px solid ${T.line}`, textAlign: 'center' }}>
          <Typography sx={{ color: T.brand, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.5 }}>
            THƯƠNG HIỆU PHÂN PHỐI
          </Typography>
          <Typography sx={{ fontWeight: 800, color: T.ink, mb: { xs: 2.5, md: 3 }, fontSize: { xs: '18px', md: '24px' } }}>
            Đối Tác Chính Hãng
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(3,1fr)', md: 'repeat(6,1fr)' }, gap: { xs: 1.5, md: 2 } }}>
            {BRANDS.map((b) => (
              <Box key={b.name} sx={{ py: { xs: 2, md: 2.5 }, px: 1, borderRadius: 2.5, background: '#fff', border: `1px solid ${T.line}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.4,
                transition: 'all .25s', '&:hover': { borderColor: b.color, transform: 'translateY(-4px)', boxShadow: `0 12px 28px ${b.color}22` } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 36 }}>
                  <Typography sx={{ fontWeight: 900, fontSize: { xs: 17, md: 22 }, color: b.color, letterSpacing: '-0.02em',
                    fontStyle: 'italic', lineHeight: 1 }}>{b.name}</Typography>
                </Box>
                <Typography sx={{ fontSize: { xs: 9.5, md: 11 }, color: T.inkSoft, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {b.sub}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Gallery — hình ảnh hoạt động */}
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 2.5, md: 4 } }}>
            <Typography sx={{ color: T.brand, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.5 }}>
              HÌNH ẢNH HOẠT ĐỘNG
            </Typography>
            <Typography sx={{ fontWeight: 800, color: T.ink, fontSize: { xs: '18px', md: '26px' } }}>
              Bách Khoa Trong Công Việc
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' },
            gridAutoRows: { xs: 140, md: 190 }, gap: { xs: 1, md: 1.5 } }}>
            {[
              { src: scaleImg(0), label: 'Cân điện tử kỹ thuật số', big: true, product: true },
              { src: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Sửa mạch điện tử' },
              { src: scaleImg(8), label: 'Cân sàn công nghiệp', product: true },
              { src: 'https://images.pexels.com/photos/3846517/pexels-photo-3846517.jpeg?auto=compress&cs=tinysrgb&w=600', label: 'Kiểm tra linh kiện' },
              { src: scaleImg(11), label: 'Cân phân tích chính xác', product: true },
            ].map((g, i) => (
              <Box key={i} sx={{ gridColumn: g.big ? { xs: '1 / 3', md: '1 / 3' } : 'auto', gridRow: g.big ? { md: 'span 2' } : 'auto',
                borderRadius: 3, overflow: 'hidden', position: 'relative', background: g.product ? '#fff' : T.bg, '&:hover img': { transform: 'scale(1.06)' } }}>
                <Box component="img" src={g.src} alt={g.label} loading="lazy"
                  sx={{ width: '100%', height: '100%', objectFit: g.product ? 'contain' : 'cover', p: g.product ? 1.5 : 0, transition: 'transform .4s' }}
                  onError={(e) => { e.target.src = '/banner.png'; }} />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(15,23,36,.75) 0%,transparent 55%)', pointerEvents: 'none' }} />
                <Typography sx={{ position: 'absolute', bottom: 10, left: 12, color: '#fff', fontWeight: 700, fontSize: { xs: 11.5, md: g.big ? 16 : 13 } }}>
                  {g.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Values */}
        <Box sx={{ background: T.surface, borderRadius: 3, p: { xs: 2.5, md: 4 }, border: `1px solid ${T.line}` }}>
          <Typography sx={{ color: T.brand, fontWeight: 700, fontSize: { xs: 11, md: 12 }, letterSpacing: '0.1em', mb: 0.5 }}>
            GIÁ TRỊ CỐT LÕI
          </Typography>
          <Typography sx={{ fontWeight: 800, color: T.ink, mb: { xs: 2.5, md: 3 }, fontSize: { xs: '18px', md: '24px' } }}>
            Những điều làm nên thương hiệu
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4,1fr)' }, gap: { xs: 1.5, md: 2 } }}>
            {VALUES.map((v, i) => (
              <Box key={i} sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3, background: T.bg, border: `1px solid ${T.line}`, textAlign: 'center',
                transition: 'all .25s', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 28px ${T.brand}14`, background: T.surface } }}>
                <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: T.gradient, mx: 'auto', mb: 1.5,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 18px ${T.brand}40` }}>
                  <FontAwesomeIcon icon={v.icon} style={{ fontSize: 21, color: '#fff' }} />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: 13.5, md: 14.5 }, mb: 0.5 }}>{v.title}</Typography>
                <Typography sx={{ fontSize: { xs: 11.5, md: 12.5 }, color: T.inkSoft, lineHeight: 1.55 }}>{v.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
