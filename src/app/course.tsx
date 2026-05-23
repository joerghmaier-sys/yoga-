import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { COURSE_DATA } from '@/data/course';
import { Colors, Spacing, Typography } from '@/constants/design';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.deepTeal,
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  headerTitle: {
    ...Typography.subheading,
    color: Colors.cream,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.lightGrey,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  blockHeader: {
    marginBottom: Spacing.md,
  },
  blockTitle: {
    ...Typography.subheading,
    color: Colors.saffron,
    marginBottom: Spacing.xs,
  },
  dayIndicator: {
    ...Typography.captionBold,
    color: Colors.grey,
  },
  lessonCard: {
    backgroundColor: Colors.darkBg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.gold,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: 8,
  },
  sectionLabel: {
    ...Typography.captionBold,
    color: Colors.saffron,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
  },
  sectionLabelFirst: {
    marginTop: 0,
  },
  sanskritWord: {
    ...Typography.subheading,
    color: Colors.cream,
    marginBottom: Spacing.xs,
  },
  pronunciation: {
    ...Typography.bodySmall,
    color: Colors.gold,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  definition: {
    ...Typography.body,
    color: Colors.cream,
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  wisdom: {
    backgroundColor: Colors.deepTeal,
    padding: Spacing.md,
    borderRadius: 8,
    marginVertical: Spacing.md,
  },
  wisdomText: {
    ...Typography.bodySmall,
    color: Colors.cream,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  godityName: {
    ...Typography.body,
    color: Colors.saffron,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  godityDescription: {
    ...Typography.bodySmall,
    color: Colors.lightGrey,
    lineHeight: 20,
  },
  story: {
    ...Typography.body,
    color: Colors.cream,
    lineHeight: 24,
  },
  questionContainer: {
    marginTop: Spacing.md,
  },
  questionItem: {
    ...Typography.bodySmall,
    color: Colors.lightGrey,
    marginBottom: Spacing.sm,
    paddingLeft: Spacing.md,
    lineHeight: 20,
  },
  questionBullet: {
    color: Colors.saffron,
  },
  completeButton: {
    backgroundColor: Colors.saffron,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  completeButtonText: {
    ...Typography.body,
    color: Colors.darkBg,
    fontWeight: '600',
  },
});

export default function CourseScreen() {
  const [todayLesson, setTodayLesson] = useState<any>(null);
  const [currentBlock, setCurrentBlock] = useState<any>(null);

  useEffect(() => {
    loadTodayLesson();
  }, []);

  const loadTodayLesson = () => {
    const block = COURSE_DATA.find(b => b.status === 'active');
    if (block) {
      setCurrentBlock(block);
      const lesson = block.lektionen[0];
      setTodayLesson(lesson);
    }
  };

  if (!todayLesson || !currentBlock) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dein Kurs</Text>
          <Text style={styles.headerSubtitle}>Laden...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📖 {currentBlock.name}</Text>
          <Text style={styles.headerSubtitle}>Tag {todayLesson.tag} von {currentBlock.tage}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            <View style={styles.lessonCard}>
              <Text style={[styles.sectionLabel, styles.sectionLabelFirst]}>Sanskrit-Wort</Text>
              <Text style={styles.sanskritWord}>{todayLesson.sanskritWort}</Text>
              <Text style={styles.pronunciation}>{todayLesson.aussprache}</Text>
              <Text style={styles.definition}>{todayLesson.bedeutung}</Text>

              <Text style={styles.sectionLabel}>Yoga-Weisheit</Text>
              <View style={styles.wisdom}>
                <Text style={styles.wisdomText}>{todayLesson.yogaWeisheit}</Text>
              </View>

              <Text style={styles.sectionLabel}>Gottheit des Tages</Text>
              <Text style={styles.godityName}>🪷 {todayLesson.gottheit}</Text>
              <Text style={styles.godityDescription}>{todayLesson.gottheitBeschreibung}</Text>

              <Text style={styles.sectionLabel}>Geschichte & Lektion</Text>
              <Text style={styles.story}>{todayLesson.geschichte}</Text>

              <View style={styles.questionContainer}>
                <Text style={styles.sectionLabel}>💭 Reflexionsfragen</Text>
                {todayLesson.reflexionsfragen.map((q: string, i: number) => (
                  <Text key={i} style={styles.questionItem}>
                    <Text style={styles.questionBullet}>• </Text>
                    {q}
                  </Text>
                ))}
              </View>

              <TouchableOpacity style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Lektion als gelesen markieren ✓</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
