import { router } from 'expo-router'
import React from 'react'
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
 
// ─── Paleta ──────────────────────────────────────────────
const ORANGE = '#e07b2a'
const BLUE   = '#1a6bbf'
const GREEN  = '#3a7d2e'
 
type IconColor = 'orange' | 'blue' | 'green' | 'amber'
 
// ════════════════════════════════════════════════════════
// CABEÇALHO
// ════════════════════════════════════════════════════════
 
function Header() {
  return (
    <View>
      {/* Barra superior */}
      <View style={s.topbar}>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:contato@mudadepois.org.br')}>
          <Text style={s.topbarText}>✉ contato@mudadepois.org.br</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('tel:+5531999990000')}>
          <Text style={s.topbarText}>📞 (31) 99999-0000</Text>
        </TouchableOpacity>
      </View>
 
      {/* Logo + botões */}
      <View style={s.mainHeader}>
        <View style={s.logoArea}>
          <Image
            source={require('../assets/images/logo.png')}
            style={s.logoImage}
            resizeMode="contain"
          />
          <View>
            <Text style={s.logoLabel}>INSTITUTO</Text>
            <Text style={s.logoName}>
              <Text style={{ color: BLUE }}>Muda</Text>
              <Text style={{ color: GREEN }}>Depois</Text>
            </Text>
          </View>
        </View>
        <View style={s.headerActions}>
          <TouchableOpacity style={s.btnLogin} onPress={() => router.push('/login')}>
            <Text style={s.btnLoginText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnCadastro} onPress={() => router.push('/cadastro')}>
            <Text style={s.btnCadastroText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnPerfil} onPress={() => router.push('/perfil')}>
            <Text style={s.btnPerfilText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
 
      {/* Menu de navegação */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.nav}
        contentContainerStyle={s.navContent}
      >
        {[
          { label: 'Início',      route: '/index'           },
          { label: 'Quem somos', route: '/quem-somos' },
          { label: 'Notícias',   route: '/noticias'   },
          { label: 'Contato',    route: '/contato'     },
        ].map((item) => (
          <TouchableOpacity
            key={item.route}
            style={s.navItem}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={s.navText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
 
      {/* Barra contextual */}
      <View style={s.strip}>
        <Text style={s.stripText}>
          📍 <Text style={s.stripHighlight}>2.400+ famílias</Text> já foram atendidas pelo Instituto
        </Text>
      </View>
    </View>
  )
}
 
// ════════════════════════════════════════════════════════
// SUB-COMPONENTES DA HOME
// ════════════════════════════════════════════════════════
 
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={s.sectionLabel}>{label}</Text>
      <Text style={s.sectionTitle}>{title}</Text>
      {subtitle && <Text style={s.sectionSub}>{subtitle}</Text>}
    </View>
  )
}
 
function StatCard({ icon, num, desc, color }: { icon: string; num: string; desc: string; color: IconColor }) {
  return (
    <View style={s.statCard}>
      <View style={[s.iconBox, s[`bg_${color}`]]}>
        <Text style={s[`fg_${color}`]}>{icon}</Text>
      </View>
      <View>
        <Text style={s.statNum}>{num}</Text>
        <Text style={s.statDesc}>{desc}</Text>
      </View>
    </View>
  )
}
 
function ImpactCard({ icon, num, desc, color }: { icon: string; num: string; desc: string; color: IconColor }) {
  return (
    <View style={s.impactCard}>
      <Text style={[s.impactIcon, s[`fg_${color}`]]}>{icon}</Text>
      <Text style={[s.impactNum,  s[`fg_${color}`]]}>{num}</Text>
      <Text style={s.impactDesc}>{desc}</Text>
    </View>
  )
}
 
function ProgramCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: IconColor }) {
  return (
    <View style={s.programCard}>
      <View style={[s.iconBox, s[`bg_${color}`]]}>
        <Text style={s[`fg_${color}`]}>{icon}</Text>
      </View>
      <Text style={s.progTitle}>{title}</Text>
      <Text style={s.progDesc}>{desc}</Text>
      <Text style={[s.progLink, { color: ORANGE }]}>→ Saiba mais</Text>
    </View>
  )
}
 
function TestiCard({ initials, quote, name, role, color }: {
  initials: string; quote: string; name: string; role: string; color: IconColor
}) {
  return (
    <View style={s.testiCard}>
      <Text style={s.stars}>★★★★★</Text>
      <Text style={s.testiQuote}>"{quote}"</Text>
      <View style={s.testiAuthor}>
        <View style={[s.avatar, s[`bg_${color}`]]}>
          <Text style={[s.avatarText, s[`fg_${color}`]]}>{initials}</Text>
        </View>
        <View>
          <Text style={s.testiName}>{name}</Text>
          <Text style={s.testiRole}>{role}</Text>
        </View>
      </View>
    </View>
  )
}
 
// ════════════════════════════════════════════════════════
// TELA PRINCIPAL
// ════════════════════════════════════════════════════════
 
export default function Index() {
  return (
    <ScrollView style={s.wrapper} showsVerticalScrollIndicator={false}>
 
      <Header />
 
      {/* ── HERO ── */}
      <View style={s.hero}>
        <View style={s.heroBadge}>
          <Text style={s.heroBadgeText}>🤝 Transformando vidas desde 2015</Text>
        </View>
        <Text style={s.heroTitle}>
          Juntos podemos construir um futuro{' '}
          <Text style={{ color: ORANGE }}>mais justo</Text> para todos
        </Text>
        <Text style={s.heroSub}>
          O Instituto Muda Depois atua no fortalecimento de famílias em situação de
          vulnerabilidade, oferecendo programas de habitação, educação e geração de renda.
        </Text>
        <View style={s.heroBtns}>
          <TouchableOpacity style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>❤️  Quero colaborar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnSecondary} onPress={() => router.push('/quem-somos')}>
            <Text style={s.btnSecondaryText}>ℹ️  Conheça o Instituto</Text>
          </TouchableOpacity>
        </View>
        <View style={s.statsRow}>
          <StatCard icon="🏠" num="2.400+" desc="famílias atendidas" color="orange" />
          <StatCard icon="🎒" num="1.800+" desc="crianças na escola" color="blue"   />
          <StatCard icon="💼" num="640"    desc="empregos gerados"   color="green"  />
        </View>
      </View>
 
      {/* ── IMPACTO ── */}
      <View style={s.impactSection}>
        <SectionHeader
          label="NOSSO IMPACTO"
          title="Números que representam pessoas"
          subtitle="Cada estatística é uma vida transformada"
        />
        <View style={s.impactGrid}>
          <ImpactCard icon="🏡" num="2.400" desc="Famílias atendidas"   color="orange" />
          <ImpactCard icon="🏘️" num="18"    desc="Municípios alcançados" color="blue"   />
          <ImpactCard icon="🌱" num="12"    desc="Anos de atuação"       color="green"  />
          <ImpactCard icon="👥" num="320"   desc="Voluntários ativos"    color="amber"  />
        </View>
      </View>
 
      {/* ── PROGRAMAS ── */}
      <View style={s.section}>
        <SectionHeader
          label="O QUE FAZEMOS"
          title="Nossos programas"
          subtitle="Atuação integrada para transformação real e duradoura"
        />
        <View style={s.programGrid}>
          <ProgramCard icon="🏠" title="Habitação digna"    desc="Reforma e construção de moradias para famílias em situação precária."          color="orange" />
          <ProgramCard icon="📚" title="Educação e reforço" desc="Aulas de reforço escolar, alfabetização e apoio pedagógico."                   color="blue"   />
          <ProgramCard icon="💼" title="Geração de renda"   desc="Capacitação profissional e apoio ao empreendedorismo local."                   color="green"  />
          <ProgramCard icon="❤️" title="Saúde comunitária"  desc="Ações de saúde preventiva, acompanhamento nutricional e psicológico."          color="orange" />
        </View>
      </View>
 
      {/* ── DEPOIMENTOS ── */}
      <View style={s.testiSection}>
        <SectionHeader
          label="DEPOIMENTOS"
          title="Vozes da comunidade"
          subtitle="Histórias reais de quem viveu a mudança"
        />
        <TestiCard
          initials="MA"
          quote="O Instituto mudou a vida da minha família. Hoje meus filhos têm onde estudar e eu tenho trabalho."
          name="Maria Aparecida"
          role="Beneficiária, Contagem - MG"
          color="blue"
        />
        <TestiCard
          initials="JS"
          quote="Aprendi um ofício e abri meu próprio negócio. O Instituto acreditou em mim quando eu não acreditava."
          name="João Santos"
          role="Beneficiário, Betim - MG"
          color="green"
        />
        <TestiCard
          initials="CF"
          quote="Ser voluntária aqui transformou também a minha vida. Ver o impacto real é emocionante."
          name="Carla Ferreira"
          role="Voluntária, Belo Horizonte - MG"
          color="orange"
        />
      </View>
 
      {/* ── CTA FINAL ── */}
      <View style={s.ctaSection}>
        <Text style={s.ctaTitle}>Faça parte dessa transformação</Text>
        <Text style={s.ctaSub}>
          Doe, seja voluntário ou divulgue o nosso trabalho. Toda contribuição importa.
        </Text>
        <View style={s.ctaBtns}>
          <TouchableOpacity style={s.ctaBtnMain}>
            <Text style={s.ctaBtnMainText}>💰  Quero doar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.ctaBtnGhost}>
            <Text style={s.ctaBtnGhostText}>👥  Ser voluntário</Text>
          </TouchableOpacity>
        </View>
      </View>
 
      {/* ── RODAPÉ ── */}
      <View style={s.footer}>
        <Text style={s.footerText}>© 2026 Instituto Muda Depois — Todos os direitos reservados</Text>
        <View style={s.footerLinks}>
          <Text style={s.footerLink} >Privacidade</Text>
          <Text style={s.footerDot}>·</Text>
          <Text style={s.footerLink} >Termos de uso</Text>
          <Text style={s.footerDot}>·</Text>
          <Text style={s.footerLink} onPress={() => Linking.openURL('https://instagram.com')}>Instagram</Text>
        </View>
      </View>
 
    </ScrollView>
  )
}
 
// ════════════════════════════════════════════════════════
// ESTILOS UNIFICADOS
// ════════════════════════════════════════════════════════
 
const s = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f8f6f2' },
 
  // ── Cabeçalho — barra superior
  topbar: {
    backgroundColor: BLUE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 12,
  },
  topbarText: { color: '#d4e8f8', fontSize: 11 },
 
  // ── Cabeçalho — logo + ações
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  logoArea:  { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoImage: { width: 56, height: 56 },
  logoLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 2, color: ORANGE },
  logoName:  { fontSize: 20, fontWeight: '800', lineHeight: 24 },
  headerActions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  btnLogin: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 10, backgroundColor: '#e8f1fb',
  },
 btnPerfil: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 10, backgroundColor: '#d3d3d3',
  },

  btnLoginText:   { color: BLUE,  fontSize: 13, fontWeight: '600' },
    btnPerfilText:   { color: BLUE,  fontSize: 13, fontWeight: '600' },
  btnCadastro: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 10, backgroundColor: ORANGE,
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnCadastroText: { color: '#fff', fontSize: 13, fontWeight: '700' },
 
  // ── Cabeçalho — nav + strip
  nav: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  navContent: { paddingHorizontal: 16, paddingVertical: 4, gap: 4, flexDirection: 'row', alignItems: 'center' },
  navItem:    { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  navText:    { fontSize: 13, fontWeight: '600', color: '#374151' },
  strip: {
    backgroundColor: '#fdf3ea',
    borderTopWidth: 1, borderTopColor: '#f0d5bc',
    paddingHorizontal: 20, paddingVertical: 8,
  },
  stripText:      { fontSize: 12, color: '#6b7280', textAlign: 'center' },
  stripHighlight: { color: ORANGE, fontWeight: '700' },
 
  // ── Hero
  hero: {
    backgroundColor: '#e8f1fb',
    padding: 28,
    borderBottomWidth: 1, borderBottomColor: '#d0e4f7',
  },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fdf3ea',
    borderWidth: 1, borderColor: '#f0d5bc',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5,
    marginBottom: 16,
  },
  heroBadgeText: { fontSize: 12, color: ORANGE, fontWeight: '500' },
  heroTitle: { fontSize: 24, fontWeight: '700', color: BLUE, lineHeight: 34, marginBottom: 14 },
  heroSub:   { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 24 },
  heroBtns:  { gap: 10, marginBottom: 28 },
  btnPrimary: {
    backgroundColor: ORANGE, paddingVertical: 13, paddingHorizontal: 20,
    borderRadius: 12, alignItems: 'center',
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPrimaryText:  { color: '#fff', fontWeight: '700', fontSize: 14 },
  btnSecondary: {
    backgroundColor: '#fff', paddingVertical: 13, paddingHorizontal: 20,
    borderRadius: 12, alignItems: 'center',
    borderWidth: 1, borderColor: '#d1d5db',
  },
  btnSecondaryText: { color: BLUE, fontWeight: '600', fontSize: 14 },
  statsRow: { gap: 10 },
  statCard: {
    backgroundColor: '#fff', borderRadius: 14,
    borderWidth: 1, borderColor: '#e5e7eb',
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  statNum:  { fontSize: 18, fontWeight: '700', color: '#111827' },
  statDesc: { fontSize: 11, color: '#6b7280', marginTop: 1 },
 
  // ── Impacto
  impactSection: { backgroundColor: '#f1f0eb', padding: 28 },
  impactGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  impactCard: {
    backgroundColor: '#fff', borderRadius: 14,
    borderWidth: 1, borderColor: '#e5e7eb',
    padding: 18, alignItems: 'center', width: '47%',
  },
  impactIcon: { fontSize: 26, marginBottom: 8 },
  impactNum:  { fontSize: 26, fontWeight: '700', lineHeight: 30 },
  impactDesc: { fontSize: 12, color: '#6b7280', marginTop: 4, textAlign: 'center' },
 
  // ── Programas
  section:     { padding: 28, backgroundColor: '#fff' },
  programGrid: { gap: 12 },
  programCard: {
    backgroundColor: '#f8f6f2', borderRadius: 14,
    borderWidth: 1, borderColor: '#e5e7eb', padding: 18,
  },
  progTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 6 },
  progDesc:  { fontSize: 13, color: '#6b7280', lineHeight: 20 },
  progLink:  { fontSize: 12, fontWeight: '600', marginTop: 12 },
 
  // ── Depoimentos
  testiSection: {
    padding: 28, backgroundColor: '#fdf3ea',
    borderTopWidth: 1, borderTopColor: '#f0d5bc',
  },
  testiCard: {
    backgroundColor: '#fff', borderRadius: 14,
    borderWidth: 1, borderColor: '#f0d5bc',
    padding: 18, marginBottom: 12,
  },
  stars:       { color: ORANGE, fontSize: 14, letterSpacing: 2, marginBottom: 10 },
  testiQuote:  { fontSize: 13, color: '#4b5563', lineHeight: 21, fontStyle: 'italic', marginBottom: 14 },
  testiAuthor: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar:      { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  avatarText:  { fontSize: 12, fontWeight: '700' },
  testiName:   { fontSize: 13, fontWeight: '700', color: '#111827' },
  testiRole:   { fontSize: 11, color: '#6b7280' },
 
  // ── CTA final
  ctaSection: { backgroundColor: BLUE, padding: 36, alignItems: 'center' },
  ctaTitle:   { fontSize: 22, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 10 },
  ctaSub:     { fontSize: 14, color: '#b5d4f4', textAlign: 'center', marginBottom: 28, lineHeight: 22 },
  ctaBtns:    { gap: 10, width: '100%' },
  ctaBtnMain: {
    backgroundColor: ORANGE, paddingVertical: 14, borderRadius: 12, alignItems: 'center',
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
  },
  ctaBtnMainText:  { color: '#fff', fontWeight: '700', fontSize: 15 },
  ctaBtnGhost: {
    paddingVertical: 14, borderRadius: 12, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)',
  },
  ctaBtnGhostText: { color: '#fff', fontWeight: '600', fontSize: 15 },
 
  // ── Rodapé
  footer:      { backgroundColor: '#0d1a2e', padding: 20, alignItems: 'center', gap: 10 },
  footerText:  { fontSize: 11, color: '#6b8fba', textAlign: 'center' },
  footerLinks: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerLink:  { fontSize: 11, color: '#6b8fba' },
  footerDot:   { fontSize: 11, color: '#2d4a6b' },
 
  // ── Cabeçalhos de seção
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: ORANGE, marginBottom: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 4 },
  sectionSub:   { fontSize: 13, color: '#6b7280' },
 
  // ── Ícones compartilhados
  iconBox: { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  bg_orange: { backgroundColor: '#fdf3ea' },
  bg_blue:   { backgroundColor: '#e8f1fb' },
  bg_green:  { backgroundColor: '#eaf3de' },
  bg_amber:  { backgroundColor: '#faeeda' },
  fg_orange: { color: ORANGE        },
  fg_blue:   { color: BLUE          },
  fg_green:  { color: GREEN         },
  fg_amber:  { color: '#c07020'     },
})