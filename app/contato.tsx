import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  TextInput,
  Image,
} from 'react-native'

// ─── Paleta ──────────────────────────────────────────────
const ORANGE = '#e07b2a'
const BLUE   = '#1a6bbf'
const GREEN  = '#3a7d2e'

// ─── Dados dos contatos ───────────────────────────────────
const CONTATOS = [
  {
    nome:     'Gustavo Alves',
    cargo:    'Coordenador',
    telefone: '31989234346',
    email:    'gustavooalves2022@gmail.com',
    iniciais: 'GA',
    foto:     require('../assets/images/gustavo.jpg'),
    color:    'blue' as const,
  },
  {
    nome:     'Ana Carolina',
    cargo:    'Assistente Social',
    telefone: '31990602966',
    email:    'anamunizcarolina@gmail.com',
    iniciais: 'AC',
    foto:     require('../assets/images/ana.jpg'),
    color:    'green' as const,
  },
]

type ContactColor = 'blue' | 'green'

// ─── Card de contato ─────────────────────────────────────
function ContactCard({ nome, cargo, telefone, email, iniciais, foto, color }: {
  nome: string; cargo: string; telefone: string
  email: string; iniciais: string; foto: any; color: ContactColor
}) {
  const telFormatado = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')

  return (
    <View style={[s.contactCard, s[`border_${color}`]]}>
      {/* Avatar + nome */}
      <View style={s.cardHeader}>
        <View style={[s.avatar, s[`border_${color}`]]}>
          <Image source={foto} style={s.avatarImage} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.contactName}>{nome}</Text>
          <View style={[s.badge, s[`bgLight_${color}`]]}>
            <Text style={[s.badgeText, s[`fg_${color}`]]}>{cargo}</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={s.divider} />

      {/* Telefone */}
      <TouchableOpacity
        style={s.contactRow}
        onPress={() => Linking.openURL(`tel:+55${telefone}`)}
        activeOpacity={0.7}
      >
        <View style={[s.rowIcon, { backgroundColor: '#fdf3ea' }]}>
          <Text style={{ color: ORANGE, fontSize: 16 }}>📞</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.rowLabel}>Telefone</Text>
          <Text style={s.rowValue}>{telFormatado}</Text>
        </View>
        <Text style={[s.rowAction, { color: ORANGE }]}>Ligar →</Text>
      </TouchableOpacity>

      {/* WhatsApp */}
      <TouchableOpacity
        style={s.contactRow}
        onPress={() => Linking.openURL(`https://wa.me/55${telefone}`)}
        activeOpacity={0.7}
      >
        <View style={[s.rowIcon, { backgroundColor: '#e6f9ee' }]}>
          <Text style={{ fontSize: 16 }}>💬</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.rowLabel}>WhatsApp</Text>
          <Text style={s.rowValue}>{telFormatado}</Text>
        </View>
        <Text style={[s.rowAction, { color: GREEN }]}>Abrir →</Text>
      </TouchableOpacity>

      {/* E-mail */}
      <TouchableOpacity
        style={[s.contactRow, { borderBottomWidth: 0 }]}
        onPress={() => Linking.openURL(`mailto:${email}`)}
        activeOpacity={0.7}
      >
        <View style={[s.rowIcon, { backgroundColor: '#e8f1fb' }]}>
          <Text style={{ color: BLUE, fontSize: 16 }}>✉️</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.rowLabel}>E-mail</Text>
          <Text style={s.rowValue} numberOfLines={1}>{email}</Text>
        </View>
        <Text style={[s.rowAction, { color: BLUE }]}>Enviar →</Text>
      </TouchableOpacity>
    </View>
  )
}

// ─── Tela de contato ─────────────────────────────────────
export default function Contato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const enviarEmail = () => {
    const dest = CONTATOS.map(c => c.email).join(',')
    const assunto = encodeURIComponent(`Mensagem de ${nome}`)
    const corpo = encodeURIComponent(mensagem)
    Linking.openURL(`mailto:${dest}?subject=${assunto}&body=${corpo}`)
  }

  return (
    <ScrollView style={s.wrapper} showsVerticalScrollIndicator={false}>

      {/* ── Cabeçalho da tela ── */}
      <View style={s.pageHeader}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backText}>← Voltar</Text>
        </TouchableOpacity>
        <View style={s.heroBadge}>
          <Text style={s.heroBadgeText}>📍 Instituto Muda Depois</Text>
        </View>
        <Text style={s.pageTitle}>Fale com a gente</Text>
        <Text style={s.pageSub}>
          Entre em contato com nossa equipe. Respondemos o mais rápido possível.
        </Text>
      </View>

      {/* ── Cards de contato ── */}
      <View style={s.section}>
        <Text style={s.sectionLabel}>NOSSA EQUIPE</Text>
        <Text style={s.sectionTitle}>Contatos diretos</Text>
        {CONTATOS.map((c) => (
          <ContactCard key={c.email} {...c} />
        ))}
      </View>

      {/* ── Formulário ── */}
      <View style={[s.section, { backgroundColor: '#f1f0eb' }]}>
        <Text style={s.sectionLabel}>FORMULÁRIO</Text>
        <Text style={s.sectionTitle}>Envie uma mensagem</Text>
        <Text style={[s.pageSub, { marginBottom: 20, marginTop: 2 }]}>
          Preencha abaixo e entraremos em contato.
        </Text>

        <View style={[s.inputWrapper, focused === 'nome' && s.inputFocused]}>
          <Text style={s.inputLabel}>Seu nome</Text>
          <TextInput
            style={s.input}
            placeholder="Nome completo"
            placeholderTextColor="#9ca3af"
            value={nome}
            onChangeText={setNome}
            onFocus={() => setFocused('nome')}
            onBlur={() => setFocused(null)}
            autoCapitalize="words"
          />
        </View>

        <View style={[s.inputWrapper, focused === 'email' && s.inputFocused, { marginTop: 12 }]}>
          <Text style={s.inputLabel}>Seu e-mail</Text>
          <TextInput
            style={s.input}
            placeholder="seu@email.com"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={[s.inputWrapper, focused === 'msg' && s.inputFocused, { marginTop: 12 }]}>
          <Text style={s.inputLabel}>Mensagem</Text>
          <TextInput
            style={[s.input, { height: 100, textAlignVertical: 'top' }]}
            placeholder="Como podemos ajudar?"
            placeholderTextColor="#9ca3af"
            value={mensagem}
            onChangeText={setMensagem}
            onFocus={() => setFocused('msg')}
            onBlur={() => setFocused(null)}
            multiline
          />
        </View>

        <TouchableOpacity style={s.btnSend} onPress={enviarEmail} activeOpacity={0.85}>
          <Text style={s.btnSendText}>✉️  Enviar mensagem</Text>
        </TouchableOpacity>
      </View>

      {/* ── Localização ── */}
      <View style={s.section}>
        <Text style={s.sectionLabel}>ONDE ESTAMOS</Text>
        <Text style={s.sectionTitle}>Localização</Text>
        <TouchableOpacity
          style={s.mapCard}
          onPress={() => Linking.openURL('https://maps.google.com/?q=Belo+Horizonte+MG')}
          activeOpacity={0.8}
        >
          <Text style={s.mapEmoji}>🗺️</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.mapTitle}>Belo Horizonte — MG</Text>
            <Text style={s.mapSub}>Toque para abrir no Google Maps</Text>
          </View>
          <Text style={{ color: ORANGE, fontWeight: '700' }}>→</Text>
        </TouchableOpacity>

        <View style={s.horasCard}>
          <Text style={s.horasTitle}>🕐  Horário de atendimento</Text>
          <Text style={s.horasItem}>Segunda a Sexta: <Text style={{ color: BLUE, fontWeight: '600' }}>08h – 18h</Text></Text>
          <Text style={s.horasItem}>Sábado: <Text style={{ color: BLUE, fontWeight: '600' }}>08h – 12h</Text></Text>
          <Text style={s.horasItem}>Domingo: <Text style={{ color: '#9ca3af' }}>Fechado</Text></Text>
        </View>
      </View>

      {/* ── Rodapé ── */}
      <View style={s.footer}>
        <Text style={s.footerText}>© 2026 Instituto Muda Depois — Todos os direitos reservados</Text>
      </View>

    </ScrollView>
  )
}

// ─── Estilos ─────────────────────────────────────────────
const s = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f8f6f2' },

  // ── Cabeçalho da tela
  pageHeader: {
    backgroundColor: '#e8f1fb',
    padding: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#d0e4f7',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  backText:    { color: BLUE, fontSize: 13, fontWeight: '600' },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fdf3ea',
    borderWidth: 1, borderColor: '#f0d5bc',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5,
    marginBottom: 14,
  },
  heroBadgeText: { fontSize: 12, color: ORANGE, fontWeight: '500' },
  pageTitle: { fontSize: 26, fontWeight: '800', color: BLUE, marginBottom: 8 },
  pageSub:   { fontSize: 14, color: '#4b5563', lineHeight: 22 },

  // ── Seções
  section:      { padding: 24, backgroundColor: '#fff' },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: ORANGE, marginBottom: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 16 },

  // ── Card de contato
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  border_blue:  { borderColor: '#bcd5f5' },
  border_green: { borderColor: '#b3d9a8' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  avatar: {
    width: 52, height: 52,
    borderRadius: 26,
    borderWidth: 2,
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  contactName: { fontSize: 17, fontWeight: '700', color: '#111827', marginBottom: 4 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: { fontSize: 11, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#f3f4f6', marginBottom: 8 },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  rowIcon: {
    width: 38, height: 38,
    borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  rowLabel:  { fontSize: 10, color: '#9ca3af', fontWeight: '600', letterSpacing: 0.5, marginBottom: 2 },
  rowValue:  { fontSize: 14, color: '#111827', fontWeight: '500' },
  rowAction: { fontSize: 12, fontWeight: '700' },

  // ── Formulário
  inputWrapper: {
    borderWidth: 1.5, borderColor: '#e5e7eb',
    borderRadius: 14, backgroundColor: '#fff',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10,
  },
  inputFocused: {
    borderColor: ORANGE,
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 3,
  },
  inputLabel: {
    fontSize: 10, fontWeight: '700', color: GREEN,
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4,
  },
  input: { fontSize: 15, color: '#111827', padding: 0 },
  btnSend: {
    backgroundColor: ORANGE, borderRadius: 14,
    paddingVertical: 15, alignItems: 'center', marginTop: 16,
    shadowColor: ORANGE, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 10, elevation: 5,
  },
  btnSendText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  // ── Localização
  mapCard: {
    backgroundColor: '#e8f1fb',
    borderRadius: 14, borderWidth: 1, borderColor: '#bcd5f5',
    padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14,
    marginBottom: 12,
  },
  mapEmoji: { fontSize: 28 },
  mapTitle: { fontSize: 15, fontWeight: '700', color: BLUE },
  mapSub:   { fontSize: 12, color: '#6b7280', marginTop: 2 },
  horasCard: {
    backgroundColor: '#f8f6f2', borderRadius: 14,
    borderWidth: 1, borderColor: '#e5e7eb', padding: 16, gap: 8,
  },
  horasTitle: { fontSize: 14, fontWeight: '700', color: '#111827', marginBottom: 4 },
  horasItem:  { fontSize: 13, color: '#374151' },

  // ── Cores compartilhadas
  bg_blue:       { backgroundColor: '#e8f1fb' },
  bg_green:      { backgroundColor: '#eaf3de' },
  bgLight_blue:  { backgroundColor: '#dbeafe' },
  bgLight_green: { backgroundColor: '#dcfce7' },
  fg_blue:       { color: BLUE  },
  fg_green:      { color: GREEN },

  // ── Rodapé
  footer:     { backgroundColor: '#0d1a2e', padding: 20, alignItems: 'center' },
  footerText: { fontSize: 11, color: '#6b8fba', textAlign: 'center' },
})