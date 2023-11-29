# Generated by Django 4.2.7 on 2023-11-28 21:19

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0002_alter_userdata_clothtype_alter_userdata_skintype"),
    ]

    operations = [
        migrations.AlterField(
            model_name="userdata",
            name="clothType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("dandy", "댄디"),
                    ("vintage", "빈티지"),
                    ("casual", "캐주얼"),
                    ("spoty", "스포티"),
                    ("classic", "클래식"),
                    ("retro", "레트로"),
                    ("urban", "모던"),
                    ("street", "스트릿"),
                    ("feminine", "페미닌"),
                    ("minimal", "미니멀"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="skinType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("oily", "지성"),
                    ("combination", "복합성"),
                    ("dry", "건성"),
                    ("sensitive", "민감성"),
                    ("acne", "여드름"),
                    ("normal", "보통"),
                ],
                max_length=20,
            ),
        ),
    ]