-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  popup_enabled BOOLEAN DEFAULT true,
  show_enquiry_popup BOOLEAN DEFAULT true,
  show_free_programs_popup BOOLEAN DEFAULT true,
  free_programs_title VARCHAR(255) DEFAULT 'FREE Programs',
  free_programs_subtitle VARCHAR(255) DEFAULT 'Limited Time Offers - Join Now!',
  free_programs_cta_text VARCHAR(255) DEFAULT 'Ready to start your wellness journey?',
  programs_config JSONB DEFAULT '[
    {
      "id": "yoga",
      "title": "YOGA Practice Session",
      "schedule": "Monday to Friday",
      "time": "5:00 AM - 6:00 AM",
      "description": "Start your day with energizing yoga practice. Perfect for beginners and experienced practitioners."
    },
    {
      "id": "healing",
      "title": "SELF HEALING Practice & Webinar",
      "schedule": "Every Saturday",
      "time": "Interactive Session",
      "description": "Learn powerful self-healing techniques and join our expert-led webinars to transform your wellness."
    },
    {
      "id": "stress",
      "title": "Stress & Anxiety Management & Meditation",
      "schedule": "Every Sunday",
      "time": "Meditation & Coaching",
      "description": "Master stress relief and anxiety management through guided meditation and expert coaching."
    }
  ]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings if not exists
INSERT INTO settings (popup_enabled, show_enquiry_popup, show_free_programs_popup, free_programs_title, free_programs_subtitle, free_programs_cta_text)
SELECT true, true, true, 'FREE Programs', 'Limited Time Offers - Join Now!', 'Ready to start your wellness journey?'
WHERE NOT EXISTS (SELECT 1 FROM settings);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();