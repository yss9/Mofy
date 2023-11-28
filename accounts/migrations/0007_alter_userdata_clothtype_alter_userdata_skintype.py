# Generated by Django 4.2.7 on 2023-11-28 14:47

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0006_alter_userdata_clothtype_alter_userdata_skintype"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userdata",
            name="clothType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("urban", "모던"),
                    ("street", "스트릿"),
                    ("dandy", "댄디"),
                    ("minimal", "미니멀"),
                    ("feminine", "페미닌"),
                    ("classic", "클래식"),
                    ("vintage", "빈티지"),
                    ("retro", "레트로"),
                    ("spoty", "스포티"),
                    ("casual", "캐주얼"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="skinType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("normal", "보통"),
                    ("dry", "건성"),
                    ("sensitive", "민감성"),
                    ("combination", "복합성"),
                    ("acne", "여드름"),
                    ("oily", "지성"),
                ],
                max_length=20,
            ),
        ),
    ]
