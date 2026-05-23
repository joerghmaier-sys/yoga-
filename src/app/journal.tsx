import { ScrollView, View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { COURSE_DATA } from '@/data/course';
import { Colors, Spacing, Typography } from '@/constants/design';
import { useStorage } from '@/hooks/useStorage';

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
  questionBox: {
    backgroundColor: Colors.deepTeal,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  questionLabel: {
    ...Typography.captionBold,
    color: Colors.saffron,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
  },
  questionText: {
    ...Typography.subheading,
    color: Colors.cream,
    lineHeight: 28,
  },
  inputLabel: {
    ...Typography.body,
    color: Colors.cream,
    marginBottom: Spacing.sm,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: Colors.darkBg,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 8,
    padding: Spacing.md,
    minHeight: 120,
    maxHeight: 200,
    color: Colors.cream,
    fontSize: 16,
    fontFamily: 'System',
    textAlignVertical: 'top',
    marginBottom: Spacing.lg,
  },
  moodSection: {
    marginVertical: Spacing.lg,
  },
  moodLabel: {
    ...Typography.body,
    color: Colors.cream,
    marginBottom: Spacing.md,
    fontWeight: '600',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.lg,
  },
  moodButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  moodButtonActive: {
    backgroundColor: Colors.gold,
  },
  moodEmoji: {
    fontSize: 28,
  },
  saveButton: {
    backgroundColor: Colors.saffron,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  saveButtonText: {
    ...Typography.body,
    color: Colors.darkBg,
    fontWeight: '600',
  },
  archiveLink: {
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  archiveLinkText: {
    ...Typography.bodySmall,
    color: Colors.saffron,
    fontWeight: '600',
  },
});

const moods = [
  { emoji: '😴', value: 1, label: 'Müde' },
  { emoji: '😐', value: 2, label: 'Neutral' },
  { emoji: '🙂', value: 3, label: 'Gut' },
  { emoji: '😊', value: 4, label: 'Glücklich' },
  { emoji: '✨', value: 5, label: 'Erleuchtet' },
];

export default function JournalScreen() {
  const [todayQuestion, setTodayQuestion] = useState<string>('');
  const [journalText, setJournalText] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<number>(3);
  const storage = useStorage();

  useEffect(() => {
    loadTodayQuestion();
    loadTodayJournal();
  }, []);

  const loadTodayQuestion = () => {
    const block = COURSE_DATA.find(b => b.status === 'active');
    if (block && block.lektionen.length > 0) {
      const question = block.lektionen[0].reflexionsfragen[0];
      setTodayQuestion(question);
    }
  };

  const loadTodayJournal = async () => {
    const today = new Date().toDateString();
    const saved = await storage.getItem(`journal_${today}`);
    if (saved) {
      const data = JSON.parse(saved);
      setJournalText(data.text || '');
      setSelectedMood(data.mood || 3);
    }
  };

  const saveJournal = async () => {
    const today = new Date().toDateString();
    const data = {
      date: today,
      text: journalText,
      mood: selectedMood,
      timestamp: new Date().toISOString(),
    };
    await storage.setItem(`journal_${today}`, JSON.stringify(data));
    alert('Tagebucheintrag gespeichert! 🙏');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📓 Deine Reflexion</Text>
          <Text style={styles.headerSubtitle}>{new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            {todayQuestion && (
              <View style={styles.questionBox}>
                <Text style={styles.questionLabel}>Heute's Frage</Text>
                <Text style={styles.questionText}>„{todayQuestion}"</Text>
              </View>
            )}

            <Text style={styles.inputLabel}>Deine Gedanken...</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Schreibe deine Gedanken, Erkenntnisse und Gefühle auf..."
              placeholderTextColor={Colors.grey}
              value={journalText}
              onChangeText={setJournalText}
              multiline
              editable
            />

            <View style={styles.moodSection}>
              <Text style={styles.moodLabel}>Wie geht es dir heute?</Text>
              <View style={styles.moodContainer}>
                {moods.map(mood => (
                  <TouchableOpacity
                    key={mood.value}
                    style={[
                      styles.moodButton,
                      selectedMood === mood.value && styles.moodButtonActive,
                    ]}
                    onPress={() => setSelectedMood(mood.value)}
                  >
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveJournal}>
              <Text style={styles.saveButtonText}>Speichern & Abschließen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.archiveLink}>
              <Text style={styles.archiveLinkText}>📖 Archiv ansehen</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
