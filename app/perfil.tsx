import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState, useCallback } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Image, ActivityIndicator, Alert,
} from 'react-native'
 
import { buscarUsuario, atualizarUsuario } from '@/src/controller/UsuarioController'
import { Usuario } from '@/src/types/Usuario'
 
const ORANGE = '#e07b2a'
const BLUE   = '#1a6bbf'
const GREEN  = '#3a7d2e'
 
// ─── Linha de informação ─────────────────────────────────
function InfoRow({ icone, label, valor }: { icone: string; label: string; valor: string }) {
  return (
    <View style={s.infoRow}>
      <View style={s.infoIconBox}>
        <Text style={s.infoIcone}>{icone}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.infoLabel}>{label}</Text>
        <Text style={s.infoValor}>{valor}</Text>
      </View>
    </View>
  )
}
 
// ─── Tela de perfil ──────────────────────────────────────
export default function Perfil() {
  const { id } = useLocalSearchParams<{ id: string }>()
 
  const [usuario,    setUsuario]   = useState<Usuario | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro,       setErro]      = useState<string | null>(null)
 
  const carregarUsuario = useCallback(async () => {
    try {
      setCarregando(true)
      setErro(null)
      const dados = await buscarUsuario(Number(id))
      if (!dados) throw new Error('Usuário não encontrado')
      setUsuario(dados)
    } catch (e: any) {
      setErro(e.message ?? 'Erro ao carregar perfil')
    } finally {
      setCarregando(false)
    }
  }, [id])
 
  useEffect(() => { carregarUsuario() }, [carregarUsuario])
 
  const atualizarFoto = async (novaFoto: string) => {
    if (!usuario) return
    try {
      await atualizarUsuario(
        usuario.id, usuario.nome, usuario.email,
        usuario.cpf, usuario.rg, usuario.dataNasc, novaFoto
      )
      setUsuario({ ...usuario, foto: novaFoto })
    } catch (e: any) {
      Alert.alert('Erro', e.message ?? 'Não foi possível atualizar a foto')
    }
  }
 
  const selecionarFoto = () => {
    // Integrar expo-image-picker:
    // const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'] })
    // if (!result.canceled) atualizarFoto(result.assets[0].uri)
    Alert.alert('Foto', 'Integre o expo-image-picker para selecionar uma foto.')
  }
 
  // ── Carregando ────────────────────────────────────────
  if (carregando) {
    return (
      <View style={s.centro}>
        <ActivityIndicator size="large" color={BLUE} />
        <Text style={s.centroTexto}>Carregando perfil...</Text>
      </View>
    )
  }
 
  // ── Erro ──────────────────────────────────────────────
  if (erro || !usuario) {
    return (
      <View style={s.centro}>
        <Text style={s.erroEmoji}>⚠️</Text>
        <Text style={s.erroTexto}>{erro ?? 'Usuário não encontrado'}</Text>
        <TouchableOpacity style={s.btnTentar} onPress={carregarUsuario}>
          <Text style={s.btnTentarText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    )
  }
 
  const iniciais = usuario.nome
    .split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
 
  return (
    <ScrollView style={s.wrapper} showsVerticalScrollIndicator={false}>
 
      {/* ── Cabeçalho ── */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={s.headerTitulo}>Meu Perfil</Text>
      </View>
 
      {/* ── Foto ── */}
      <View style={s.fotoSection}>
        <View style={s.fotoWrapper}>
          {usuario.foto ? (
            <Image source={{ uri: usuario.foto }} style={s.fotoImagem} />
          ) : (
            <View style={s.fotoVazia}>
              <Text style={s.fotoIniciais}>{iniciais}</Text>
            </View>
          )}
          <TouchableOpacity style={s.fotoBotao} onPress={selecionarFoto} activeOpacity={0.8}>
            <Text style={s.fotoBotaoIcone}>📷</Text>
          </TouchableOpacity>
        </View>
        <Text style={s.fotoNome}>{usuario.nome}</Text>
        <Text style={s.fotoEmail}>{usuario.email}</Text>
      </View>
 
      {/* ── Dados pessoais ── */}
      <View style={s.section}>
        <Text style={s.sectionLabel}>DADOS PESSOAIS</Text>
        <View style={s.card}>
          <InfoRow icone="👤" label="Nome completo"      valor={usuario.nome}     />
          <View style={s.divider} />
          <InfoRow icone="🎂" label="Data de nascimento" valor={usuario.dataNasc} />
          <View style={s.divider} />
          <InfoRow icone="🪪" label="CPF"                valor={usuario.cpf}      />
          <View style={s.divider} />
          <InfoRow icone="📋" label="RG"                 valor={usuario.rg}       />
          <View style={s.divider} />
          <InfoRow icone="✉️"  label="E-mail"             valor={usuario.email}    />
        </View>
      </View>
 
      {/* ── Ações ── */}
      <View style={s.section}>
        <Text style={s.sectionLabel}>CONTA</Text>
        <View style={s.card}>
 
          <TouchableOpacity
            style={s.actionRow}
            onPress={() => router.push({ pathname: '/editar-perfil', params: { id: usuario.id } } as any)}
          >
            <View style={[s.actionIcon, { backgroundColor: '#e8f1fb' }]}>
              <Text>✏️</Text>
            </View>
            <Text style={s.actionText}>Editar informações</Text>
            <Text style={s.actionArrow}>›</Text>
          </TouchableOpacity>
 
          <View style={s.divider} />
 
          <TouchableOpacity style={s.actionRow} onPress={() => router.push('/noticias' as any)}>
            <View style={[s.actionIcon, { backgroundColor: '#eaf3de' }]}>
              <Text>📰</Text>
            </View>
            <Text style={s.actionText}>Minhas publicações</Text>
            <Text style={s.actionArrow}>›</Text>
          </TouchableOpacity>
 
          <View style={s.divider} />
 
          <TouchableOpacity style={s.actionRow} onPress={() => router.push('/contato' as any)}>
            <View style={[s.actionIcon, { backgroundColor: '#fdf3ea' }]}>
              <Text>📞</Text>
            </View>
            <Text style={s.actionText}>Falar com a equipe</Text>
            <Text style={s.actionArrow}>›</Text>
          </TouchableOpacity>
 
        </View>
      </View>
 
      {/* ── Sair ── */}
      <View style={s.sairSection}>
        <TouchableOpacity style={s.btnSair} onPress={() => router.replace('/' as any)}>
          <Text style={s.btnSairText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
 
      <View style={s.footer}>
        <Text style={s.footerText}>© 2026 Instituto Muda Depois</Text>
      </View>
 
    </ScrollView>
  )
}
 
// ─── Estilos ─────────────────────────────────────────────
const s = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f8f6f2' },
 
  centro:        { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32 },
  centroTexto:   { fontSize: 14, color: '#6b7280' },
  erroEmoji:     { fontSize: 40 },
  erroTexto:     { fontSize: 14, color: '#ef4444', textAlign: 'center' },
  btnTentar:     { backgroundColor: BLUE, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 24, marginTop: 8 },
  btnTentarText: { color: '#fff', fontWeight: '700', fontSize: 14 },
 
  header: {
    backgroundColor: BLUE, paddingTop: 48, paddingBottom: 20,
    paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', gap: 16,
  },
  backBtn:      { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8 },
  backText:     { color: '#fff', fontSize: 13, fontWeight: '600' },
  headerTitulo: { fontSize: 18, fontWeight: '700', color: '#fff' },
 
  fotoSection:    { backgroundColor: BLUE, alignItems: 'center', paddingBottom: 36, paddingHorizontal: 24 },
  fotoWrapper:    { position: 'relative', marginBottom: 14 },
  fotoImagem:     { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: '#fff' },
  fotoVazia:      { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center' },
  fotoIniciais:   { fontSize: 32, fontWeight: '800', color: '#fff' },
  fotoBotao:      { position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, backgroundColor: ORANGE, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  fotoBotaoIcone: { fontSize: 14 },
  fotoNome:       { fontSize: 20, fontWeight: '800', color: '#fff', textAlign: 'center' },
  fotoEmail:      { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
 
  section:      { paddingHorizontal: 20, paddingTop: 24 },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: ORANGE, marginBottom: 10 },
 
  card:    { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  divider: { height: 1, backgroundColor: '#f3f4f6', marginHorizontal: 16 },
 
  infoRow:     { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  infoIconBox: { width: 38, height: 38, backgroundColor: '#f3f4f6', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoIcone:   { fontSize: 18 },
  infoLabel:   { fontSize: 10, fontWeight: '700', color: '#9ca3af', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 },
  infoValor:   { fontSize: 15, fontWeight: '500', color: '#111827' },
 
  actionRow:   { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  actionIcon:  { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionText:  { flex: 1, fontSize: 15, fontWeight: '500', color: '#111827' },
  actionArrow: { fontSize: 22, color: '#d1d5db', fontWeight: '300' },
 
  sairSection: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 },
  btnSair:     { borderWidth: 1.5, borderColor: '#fecaca', borderRadius: 14, paddingVertical: 14, alignItems: 'center', backgroundColor: '#fff5f5' },
  btnSairText: { fontSize: 15, fontWeight: '700', color: '#ef4444' },
 
  footer:     { padding: 24, alignItems: 'center' },
  footerText: { fontSize: 11, color: '#9ca3af' },
})