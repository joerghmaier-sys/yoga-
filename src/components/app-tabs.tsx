import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Colors } from '@/constants/design';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={Colors.darkBg}
      indicatorColor={Colors.saffron}
      labelStyle={{
        selected: { color: Colors.saffron },
        default: { color: Colors.grey }
      }}>

      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>🏠 Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="course">
        <NativeTabs.Trigger.Label>📖 Kurs</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="pranayama">
        <NativeTabs.Trigger.Label>🌬️ Pranayama</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="journal">
        <NativeTabs.Trigger.Label>📓 Tagebuch</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>⚙️ Einstellungen</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
