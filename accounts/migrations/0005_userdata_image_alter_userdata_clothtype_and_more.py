# Generated by Django 4.2.7 on 2023-11-29 14:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0004_alter_userdata_clothtype_alter_userdata_skintype"),
    ]

    operations = [
        migrations.AddField(
            model_name="userdata",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="uploads"),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="clothType",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="skinType",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
