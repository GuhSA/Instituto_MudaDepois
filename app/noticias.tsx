import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
 
// ─── Paleta ──────────────────────────────────────────────
const ORANGE = '#e07b2a'
const BLUE   = '#1a6bbf'
const GREEN  = '#3a7d2e'
 
// ─── Tipos ───────────────────────────────────────────────
type Categoria = 'Instituto' | 'Comunidade' | 'Evento' | 'Geral'
type Post = {
  id: number
  autor: string
  iniciais: string
  cargo: string
  tipo: 'oficial' | 'usuario'
  categoria: Categoria
  titulo: string
  conteudo: string
  data: string
  curtidas: number
  comentarios: number
  curtido: boolean
}
 
// ─── Posts iniciais ───────────────────────────────────────
const POSTS_INICIAIS: Post[] = [
  {
    id: 1,
    autor: 'Instituto Muda Depois',
    iniciais: 'IM',
    cargo: 'Oficial',
    tipo: 'oficial',
    categoria: 'Instituto',
    titulo: 'Novo programa de habitação atinge 300 famílias em BH',
    conteudo: 'Com muito orgulho, anunciamos que nosso programa de habitação digna alcançou a marca de 300 famílias atendidas em Belo Horizonte. As reformas incluem telhados, instalações elétricas e hidráulicas para garantir mais segurança e conforto.',
    data: '02/06/2026',
    curtidas: 48,
    comentarios: 12,
    curtido: false,
  },
  {
    id: 2,
    autor: 'Gustavo Alves',
    iniciais: 'GA',
    cargo: 'Coordenador',
    tipo: 'oficial',
    categoria: 'Evento',
    titulo: 'Inscrições abertas para o workshop de empreendedorismo',
    conteudo: 'Estão abertas as inscrições para o workshop gratuito de empreendedorismo que acontecerá no dia 20/06. São 40 vagas limitadas para moradores das comunidades parceiras. Inscreva-se pelo link na bio!',
    data: '01/06/2026',
    curtidas: 31,
    comentarios: 8,
    curtido: false,
  },
  {
    id: 3,
    autor: 'Maria Aparecida',
    iniciais: 'MA',
    cargo: 'Voluntária',
    tipo: 'usuario',
    categoria: 'Comunidade',
    titulo: 'Mutirão de limpeza no bairro São Paulo neste sábado',
    conteudo: 'Olá pessoal! Estamos organizando um mutirão de limpeza no bairro São Paulo neste sábado às 8h. Quem puder ajudar, traga luvas e vassoura. Vamos juntos cuidar do nosso espaço! 💪',
    data: '31/05/2026',
    curtidas: 22,
    comentarios: 5,
    curtido: false,
  },
  {
    id: 4,
    autor: 'Ana Carolina',
    iniciais: 'AC',
    cargo: 'Assistente Social',
    tipo: 'oficial',
    categoria: 'Instituto',
    titulo: 'Relatório de impacto 2025 já está disponível',
    conteudo: 'Publicamos o relatório completo de impacto do ano de 2025. Nele você encontra dados sobre todas as nossas frentes de atuação, número de beneficiários, investimentos realizados e os planos para 2026.',
    data: '30/05/2026',
    curtidas: 37,
    comentarios: 4,
    curtido: false,
  },
  {
    id: 5,
    autor: 'João Santos',
    iniciais: 'JS',
    cargo: 'Beneficiário',
    tipo: 'usuario',
    categoria: 'Geral',
    titulo: 'Gratidão pelo curso de marcenaria!',
    conteudo: 'Quero compartilhar com a comunidade que concluí o curso de marcenaria oferecido pelo Instituto e já estou trabalhando! Minha vida mudou completamente. Muito obrigado a todos os envolvidos. 🙏',
    data: '28/05/2026',
    curtidas: 65,
    comentarios: 18,
    curtido: false,
  },
]
 
const CATEGORIAS: Categoria[] = ['Instituto', 'Comunidade', 'Evento', 'Geral']
 
const COR_CATEGORIA: Record<Categoria, { bg: string; fg: string }> = {
  Instituto:  { bg: '#e8f1fb', fg: BLUE   },
  Comunidade: { bg: '#eaf3de', fg: GREEN   },
  Evento:     { bg: '#fdf3ea', fg: ORANGE  },
  Geral:      { bg: '#f3f4f6', fg: '#374151' },
}
 
// ─── Sub-componentes ──────────────────────────────────────
 
function TagCategoria({ cat }: { cat: Categoria }) {
  const cor = COR_CATEGORIA[cat]
  return (
    <View style={[s.tag, { backgroundColor: cor.bg }]}>
      <Text style={[s.tagText, { color: cor.fg }]}>{cat}</Text>
    </View>
  )
}
 
function CardPost({ post, onCurtir }: { post: Post; onCurtir: (id: number) => void }) {
  const isOficial = post.tipo === 'oficial'
  return (
    <View style={[s.card, isOficial && s.cardOficial]}>
      {/* Topo */}
      <View style={s.cardTop}>
        <View style={[s.avatar, { backgroundColor: isOficial ? '#e8f1fb' : '#f3f4f6' }]}>
          <Text style={[s.avatarText, { color: isOficial ? BLUE : '#374151' }]}>{post.iniciais}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={s.autorRow}>
            <Text style={s.autorNome}>{post.autor}</Text>
            {isOficial && (
              <View style={s.badgeOficial}>
                <Text style={s.badgeOficialText}>✓ Oficial</Text>
              </View>
            )}
          </View>
          <Text style={s.autorCargo}>{post.cargo} · {post.data}</Text>
        </View>
        <TagCategoria cat={post.categoria} />
      </View>
 
      {/* Conteúdo */}
      <Text style={s.postTitulo}>{post.titulo}</Text>
      <Text style={s.postConteudo} numberOfLines={3}>{post.conteudo}</Text>
 
      {/* Ações */}
      <View style={s.cardActions}>
        <TouchableOpacity style={s.actionBtn} onPress={() => onCurtir(post.id)}>
          <Text style={[s.actionIcon, post.curtido && { color: ORANGE }]}>
            {post.curtido ? '❤️' : '🤍'}
          </Text>
          <Text style={[s.actionText, post.curtido && { color: ORANGE }]}>{post.curtidas}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.actionBtn}>
          <Text style={s.actionIcon}>💬</Text>
          <Text style={s.actionText}>{post.comentarios}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.actionBtn}>
          <Text style={s.actionIcon}>↗️</Text>
          <Text style={s.actionText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
 
// ─── Tela principal ───────────────────────────────────────
export default function Noticias() {
  const [posts, setPosts]               = useState<Post[]>(POSTS_INICIAIS)
  const [filtro, setFiltro]             = useState<Categoria | 'Todos'>('Todos')
  const [busca, setBusca]               = useState('')
  const [modalVisivel, setModalVisivel] = useState(false)
  const [focused, setFocused]           = useState<string | null>(null)
 
  // Novo post
  const [novoTitulo,    setNovoTitulo]    = useState('')
  const [novoConteudo,  setNovoConteudo]  = useState('')
  const [novoAutor,     setNovoAutor]     = useState('')
  const [novaCategoria, setNovaCategoria] = useState<Categoria>('Geral')
 
  const postsFiltrados = posts.filter((p) => {
    const passaFiltro = filtro === 'Todos' || p.categoria === filtro
    const passaBusca  = p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                        p.conteudo.toLowerCase().includes(busca.toLowerCase())
    return passaFiltro && passaBusca
  })
 
  const curtir = (id: number) => {
    setPosts((prev) => prev.map((p) =>
      p.id === id
        ? { ...p, curtido: !p.curtido, curtidas: p.curtido ? p.curtidas - 1 : p.curtidas + 1 }
        : p
    ))
  }
 
  const publicar = () => {
    if (!novoTitulo.trim() || !novoConteudo.trim() || !novoAutor.trim()) return
    const novo: Post = {
      id:          Date.now(),
      autor:       novoAutor,
      iniciais:    novoAutor.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      cargo:       'Usuário',
      tipo:        'usuario',
      categoria:   novaCategoria,
      titulo:      novoTitulo,
      conteudo:    novoConteudo,
      data:        new Date().toLocaleDateString('pt-BR'),
      curtidas:    0,
      comentarios: 0,
      curtido:     false,
    }
    setPosts((prev) => [novo, ...prev])
    setNovoTitulo(''); setNovoConteudo(''); setNovoAutor('')
    setNovaCategoria('Geral')
    setModalVisivel(false)
  }
 
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={s.wrapper} showsVerticalScrollIndicator={false}>
 
        {/* ── Cabeçalho ── */}
        <View style={s.pageHeader}>
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
            <Text style={s.backText}>← Voltar</Text>
          </TouchableOpacity>
          <View style={s.heroBadge}>
            <Text style={s.heroBadgeText}>📰 Fórum da Comunidade</Text>
          </View>
          <Text style={s.pageTitle}>Notícias & Publicações</Text>
          <Text style={s.pageSub}>
            Acompanhe as novidades do Instituto e compartilhe com a comunidade.
          </Text>
          <TouchableOpacity style={s.btnPublicar} onPress={() => setModalVisivel(true)}>
            <Text style={s.btnPublicarText}>✏️  Nova publicação</Text>
          </TouchableOpacity>
        </View>
 
        {/* ── Busca ── */}
        <View style={s.searchSection}>
          <View style={[s.searchBox, focused === 'busca' && s.searchFocused]}>
            <Text style={s.searchIcon}>🔍</Text>
            <TextInput
              style={s.searchInput}
              placeholder="Buscar publicações..."
              placeholderTextColor="#9ca3af"
              value={busca}
              onChangeText={setBusca}
              onFocus={() => setFocused('busca')}
              onBlur={() => setFocused(null)}
            />
          </View>
        </View>
 
        {/* ── Filtros ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={s.filtrosScroll}
          contentContainerStyle={s.filtrosContent}
        >
          {(['Todos', ...CATEGORIAS] as const).map((f) => (
            <TouchableOpacity
              key={f}
              style={[s.filtroBtn, filtro === f && s.filtroBtnAtivo]}
              onPress={() => setFiltro(f)}
            >
              <Text style={[s.filtroText, filtro === f && s.filtroTextAtivo]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
 
        {/* ── Contador ── */}
        <View style={s.contador}>
          <Text style={s.contadorText}>
            {postsFiltrados.length} publicação{postsFiltrados.length !== 1 ? 'ões' : ''} encontrada{postsFiltrados.length !== 1 ? 's' : ''}
          </Text>
        </View>
 
        {/* ── Lista de posts ── */}
        <View style={s.lista}>
          {postsFiltrados.length === 0 ? (
            <View style={s.vazio}>
              <Text style={s.vazioEmoji}>📭</Text>
              <Text style={s.vazioTexto}>Nenhuma publicação encontrada.</Text>
            </View>
          ) : (
            postsFiltrados.map((p) => (
              <CardPost key={p.id} post={p} onCurtir={curtir} />
            ))
          )}
        </View>
 
      </ScrollView>
 
      {/* ── Modal nova publicação ── */}
      <Modal visible={modalVisivel} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={s.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={s.modalCard}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitulo}>Nova publicação</Text>
              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Text style={s.modalFechar}>✕</Text>
              </TouchableOpacity>
            </View>
 
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Nome */}
              <View style={[s.inputWrapper, focused === 'autor' && s.inputFocused]}>
                <Text style={s.inputLabel}>Seu nome</Text>
                <TextInput
                  style={s.input}
                  placeholder="Como quer ser identificado?"
                  placeholderTextColor="#9ca3af"
                  value={novoAutor}
                  onChangeText={setNovoAutor}
                  onFocus={() => setFocused('autor')}
                  onBlur={() => setFocused(null)}
                  autoCapitalize="words"
                />
              </View>
 
              {/* Categoria */}
              <Text style={[s.inputLabel, { marginTop: 14, marginBottom: 8, marginLeft: 2 }]}>Categoria</Text>
              <View style={s.categoriasRow}>
                {CATEGORIAS.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[s.catBtn, novaCategoria === c && s.catBtnAtivo]}
                    onPress={() => setNovaCategoria(c)}
                  >
                    <Text style={[s.catBtnText, novaCategoria === c && s.catBtnTextAtivo]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
 
              {/* Título */}
              <View style={[s.inputWrapper, { marginTop: 14 }, focused === 'titulo' && s.inputFocused]}>
                <Text style={s.inputLabel}>Título</Text>
                <TextInput
                  style={s.input}
                  placeholder="Título da publicação"
                  placeholderTextColor="#9ca3af"
                  value={novoTitulo}
                  onChangeText={setNovoTitulo}
                  onFocus={() => setFocused('titulo')}
                  onBlur={() => setFocused(null)}
                />
              </View>
 
              {/* Conteúdo */}
              <View style={[s.inputWrapper, { marginTop: 12 }, focused === 'conteudo' && s.inputFocused]}>
                <Text style={s.inputLabel}>Conteúdo</Text>
                <TextInput
                  style={[s.input, { height: 110, textAlignVertical: 'top' }]}
                  placeholder="Escreva sua publicação..."
                  placeholderTextColor="#9ca3af"
                  value={novoConteudo}
                  onChangeText={setNovoConteudo}
                  onFocus={() => setFocused('conteudo')}
                  onBlur={() => setFocused(null)}
                  multiline
                />
              </View>
 
              <TouchableOpacity
                style={[s.btnPublicarModal, (!novoTitulo || !novoConteudo || !novoAutor) && { opacity: 0.5 }]}
                onPress={publicar}
                disabled={!novoTitulo || !novoConteudo || !novoAutor}
              >
                <Text style={s.btnPublicarModalText}>Publicar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}
 
// ─── Estilos ─────────────────────────────────────────────
const s = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f8f6f2' },
 
  // ── Cabeçalho
  pageHeader: {
    backgroundColor: '#e8f1fb',
    padding: 28,
    borderBottomWidth: 1, borderBottomColor: '#d0e4f7',
  },
  backBtn: {
    alignSelf: 'flex-start', marginBottom: 16,
    paddingVertical: 6, paddingHorizontal: 12,
    backgroundColor: '#fff', borderRadius: 8,
    borderWidth: 1, borderColor: '#d1d5db',
  },
  backText:      { color: BLUE, fontSize: 13, fontWeight: '600' },
  heroBadge: {
    alignSelf: 'flex-start', backgroundColor: '#fdf3ea',
    borderWidth: 1, borderColor: '#f0d5bc',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 14,
  },
  heroBadgeText: { fontSize: 12, color: ORANGE, fontWeight: '500' },
  pageTitle:     { fontSize: 26, fontWeight: '800', color: BLUE, marginBottom: 8 },
  pageSub:       { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 20 },
  btnPublicar: {
    backgroundColor: ORANGE, borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 20,
    alignSelf: 'flex-start',
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPublicarText: { color: '#fff', fontWeight: '700', fontSize: 14 },
 
  // ── Busca
  searchSection: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#f3f4f6', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#e5e7eb',
    paddingHorizontal: 14, paddingVertical: 10,
  },
  searchFocused: { borderColor: ORANGE },
  searchIcon:    { fontSize: 16 },
  searchInput:   { flex: 1, fontSize: 14, color: '#111827', padding: 0 },
 
  // ── Filtros
  filtrosScroll:  { backgroundColor: '#fff' },
  filtrosContent: { paddingHorizontal: 16, paddingVertical: 10, gap: 8, flexDirection: 'row' },
  filtroBtn: {
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  filtroBtnAtivo: { backgroundColor: ORANGE, borderColor: ORANGE },
  filtroText:     { fontSize: 13, fontWeight: '600', color: '#374151' },
  filtroTextAtivo:{ color: '#fff' },
 
  // ── Contador
  contador: { paddingHorizontal: 20, paddingVertical: 10 },
  contadorText: { fontSize: 12, color: '#9ca3af', fontWeight: '500' },
 
  // ── Lista
  lista: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },
  vazio: { alignItems: 'center', paddingVertical: 48 },
  vazioEmoji: { fontSize: 40, marginBottom: 12 },
  vazioTexto: { fontSize: 14, color: '#9ca3af' },
 
  // ── Card de post
  card: {
    backgroundColor: '#fff', borderRadius: 16,
    borderWidth: 1, borderColor: '#e5e7eb',
    padding: 18,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  cardOficial: { borderLeftWidth: 4, borderLeftColor: BLUE },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 14 },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  avatarText:  { fontSize: 15, fontWeight: '800' },
  autorRow:    { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  autorNome:   { fontSize: 14, fontWeight: '700', color: '#111827' },
  autorCargo:  { fontSize: 11, color: '#9ca3af', marginTop: 2 },
  badgeOficial: {
    backgroundColor: '#e8f1fb', borderRadius: 6,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  badgeOficialText: { fontSize: 10, fontWeight: '700', color: BLUE },
  postTitulo:  { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 8, lineHeight: 22 },
  postConteudo:{ fontSize: 13, color: '#4b5563', lineHeight: 20, marginBottom: 14 },
  cardActions: { flexDirection: 'row', gap: 4, borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 12 },
  actionBtn:   { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  actionIcon:  { fontSize: 15 },
  actionText:  { fontSize: 12, color: '#6b7280', fontWeight: '500' },
 
  // ── Tag
  tag:     { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8 },
  tagText: { fontSize: 10, fontWeight: '700' },
 
  // ── Modal
  modalOverlay: {
    flex: 1, justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalCard: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, maxHeight: '90%',
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitulo: { fontSize: 18, fontWeight: '800', color: '#111827' },
  modalFechar: { fontSize: 20, color: '#9ca3af', fontWeight: '700', padding: 4 },
 
  // ── Inputs do modal
  inputWrapper: {
    borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 14,
    backgroundColor: '#f9fafb', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10,
  },
  inputFocused: {
    borderColor: ORANGE, backgroundColor: '#fff',
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 3,
  },
  inputLabel: { fontSize: 10, fontWeight: '700', color: GREEN, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 },
  input:      { fontSize: 15, color: '#111827', padding: 0 },
 
  // ── Categorias do modal
  categoriasRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20, borderWidth: 1.5, borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  catBtnAtivo:     { backgroundColor: ORANGE, borderColor: ORANGE },
  catBtnText:      { fontSize: 13, fontWeight: '600', color: '#374151' },
  catBtnTextAtivo: { color: '#fff' },
 
  btnPublicarModal: {
    backgroundColor: ORANGE, borderRadius: 14,
    paddingVertical: 15, alignItems: 'center', marginTop: 20, marginBottom: 8,
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPublicarModalText: { color: '#fff', fontWeight: '700', fontSize: 15 },
})