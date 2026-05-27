import { router } from 'expo-router'
import React, { useState } from 'react'
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Image,KeyboardAvoidingView,Platform,ScrollView,StatusBar,} from 'react-native'
 
export default function Index() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
 
  const handleCadastro = () => {
    router.push('/cadastro')
  }
 
  const inputStyle = (field: string) => [
    styles.inputWrapper,
    focusedField === field && styles.inputFocused,
  ]
 
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
 
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
 
          <Text style={styles.title}>Faça seu login</Text>
          <Text style={styles.subtitle}>Preencha os dados abaixo para fazer seu login</Text>
 
          {/* Campos */}
          <View style={styles.fields}>
            
 
            <View style={inputStyle('email')}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#9ca3af"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
 
            <View style={inputStyle('password')}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                secureTextEntry
              />
            </View>
          </View>
 
          {/* Botão */}
          <TouchableOpacity style={styles.button} onPress={handleCadastro} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
 
          {/* Rodapé */}
          <Text style={styles.footer}>
           Não possui uma conta?{' '}
            <Text style={styles.footerLink} onPress={() => router.push('/cadastro')}>
              Faça seu cadastro
            </Text>
          </Text>
        </View>
 
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
 
const ORANGE = '#e07b2a'
const BLUE = '#1a6bbf'
const GREEN = '#3a7d2e'
 
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f6f2',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
 
  logo: {
    width: 180,
    height: 160,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: BLUE,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
 
  fields: {
    width: '100%',
    gap: 14,
    marginBottom: 24,
  },
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputFocused: {
    borderColor: ORANGE,
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: GREEN,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  input: {
    fontSize: 15,
    color: '#111827',
    padding: 0,
  },
 
  button: {
    width: '100%',
    backgroundColor: ORANGE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.4,
  },
 
  footer: {
    marginTop: 24,
    fontSize: 14,
    color: '#6b7280',
  },
  footerLink: {
    color: BLUE,
    fontWeight: '700',
  },
})