import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';

const ORANGE = '#e07b2a';
const BLUE = '#1a6bbf';
const GREEN = '#3a7d2e';

export default function QuemSomos() {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.hero}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <Image
          source={require('../assets/images/logo.png')}
          style={styles.heroImage}
          resizeMode="contain"
        />

        <Text style={styles.badge}>🏛️ QUEM SOMOS</Text>

        <Text style={styles.title}>
          Transformando vidas através da
          <Text style={{ color: ORANGE }}> solidariedade</Text>
        </Text>

        <Text style={styles.subtitle}>
          O Instituto Muda Depois é uma organização social dedicada a promover
          inclusão, cidadania e oportunidades para famílias em situação de
          vulnerabilidade.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa História</Text>

        <Text style={styles.text}>
          O Instituto Muda Depois nasceu do compromisso de promover mudanças
          reais e duradouras na vida das pessoas. Atuamos em projetos sociais,
          educacionais e comunitários que fortalecem famílias e ampliam
          oportunidades.
        </Text>

        <Text style={styles.text}>
          Ao longo dos anos, nossa atuação tem contribuído para o
          desenvolvimento de comunidades, oferecendo suporte, capacitação e
          esperança para milhares de pessoas.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Missão</Text>
        <Text style={styles.text}>
          Promover oportunidades que contribuam para o desenvolvimento social,
          educacional e econômico das famílias atendidas.
        </Text>

        <Text style={styles.sectionTitle}>Visão</Text>
        <Text style={styles.text}>
          Ser referência em transformação social, construindo comunidades mais
          fortes, inclusivas e sustentáveis.
        </Text>

        <Text style={styles.sectionTitle}>Valores</Text>
        <Text style={styles.text}>
          • Respeito às pessoas{"\n"}
          • Ética e transparência{"\n"}
          • Inclusão social{"\n"}
          • Compromisso com a comunidade{"\n"}
          • Desenvolvimento sustentável
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossas Áreas de Atuação</Text>

        <View style={styles.areasGrid}>
          <View style={styles.areaCard}>
            <Text style={styles.areaIcon}>🏠</Text>
            <Text style={styles.areaTitle}>Habitação</Text>
          </View>

          <View style={styles.areaCard}>
            <Text style={styles.areaIcon}>📚</Text>
            <Text style={styles.areaTitle}>Educação</Text>
          </View>

          <View style={styles.areaCard}>
            <Text style={styles.areaIcon}>💼</Text>
            <Text style={styles.areaTitle}>Empregabilidade</Text>
          </View>

          <View style={styles.areaCard}>
            <Text style={styles.areaIcon}>❤️</Text>
            <Text style={styles.areaTitle}>Saúde</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitleCenter}>
          Nosso Impacto em Números
        </Text>

        <View style={styles.statsGrid}>
          <View style={styles.card}>
            <Text style={styles.number}>2.400+</Text>
            <Text style={styles.label}>Famílias atendidas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.number}>1.800+</Text>
            <Text style={styles.label}>Crianças apoiadas</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.number}>640</Text>
            <Text style={styles.label}>Empregos gerados</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.number}>320</Text>
            <Text style={styles.label}>Voluntários ativos</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa Equipe</Text>

        <View style={styles.teamCard}>
          <Text style={styles.teamName}>Coordenação Geral</Text>
          <Text style={styles.teamRole}>
            Responsável pela gestão dos projetos e ações sociais.
          </Text>
        </View>

        <View style={styles.teamCard}>
          <Text style={styles.teamName}>Equipe Educacional</Text>
          <Text style={styles.teamRole}>
            Apoio pedagógico e desenvolvimento de atividades educacionais.
          </Text>
        </View>

        <View style={styles.teamCard}>
          <Text style={styles.teamName}>Voluntários</Text>
          <Text style={styles.teamRole}>
            Pessoas comprometidas com a transformação social.
          </Text>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>
          Faça parte da transformação
        </Text>

        <Text style={styles.ctaText}>
          Sua ajuda pode mudar a vida de centenas de famílias.
        </Text>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => router.push('/doe')}
        >
          <Text style={styles.ctaButtonText}>
            ❤️ Quero ajudar
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f6f2',
  },

  hero: {
    backgroundColor: '#e8f1fb',
    padding: 24,
  },

  heroImage: {
    width: '100%',
    height: 180,
    marginVertical: 20,
  },

  badge: {
    color: ORANGE,
    fontWeight: '700',
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: BLUE,
    marginBottom: 14,
  },

  subtitle: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: BLUE,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  backButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  section: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: BLUE,
    marginBottom: 12,
  },

  text: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 10,
  },

  areasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  areaCard: {
    width: '48%',
    backgroundColor: '#f8f6f2',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  areaIcon: {
    fontSize: 32,
  },

  areaTitle: {
    marginTop: 10,
    fontWeight: '700',
  },

  statsSection: {
    padding: 24,
    backgroundColor: '#f1f0eb',
  },

  sectionTitleCenter: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: BLUE,
    marginBottom: 20,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  number: {
    fontSize: 28,
    fontWeight: '700',
    color: GREEN,
  },

  label: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 6,
  },

  teamCard: {
    backgroundColor: '#f8f6f2',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },

  teamName: {
    fontSize: 18,
    fontWeight: '700',
    color: BLUE,
  },

  teamRole: {
    color: '#6b7280',
    marginTop: 4,
  },

  ctaSection: {
    backgroundColor: BLUE,
    padding: 30,
    alignItems: 'center',
  },

  ctaTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },

  ctaText: {
    color: '#dbeafe',
    textAlign: 'center',
    marginBottom: 20,
  },

  ctaButton: {
    backgroundColor: ORANGE,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },

  ctaButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});