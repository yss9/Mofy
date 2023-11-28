# Generated by Django 4.2.7 on 2023-11-28 10:50

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userdata",
            name="clothType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("dandy", "댄디"),
                    ("minimal", "미니멀"),
                    ("feminine", "페미닌"),
                    ("retro", "레트로"),
                    ("urban", "모던"),
                    ("casual", "캐주얼"),
                    ("street", "스트릿"),
                    ("vintage", "빈티지"),
                    ("spoty", "스포티"),
                    ("classic", "클래식"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="skinType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("dry", "건성"),
                    ("normal", "보통"),
                    ("combination", "복합성"),
                    ("oily", "지성"),
                    ("acne", "여드름"),
                    ("sensitive", "민감성"),
                ],
                max_length=20,
            ),
        ),
    ]