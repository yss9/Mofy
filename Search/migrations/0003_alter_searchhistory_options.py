# Generated by Django 4.2.7 on 2023-11-28 16:08

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("Search", "0002_alter_searchhistory_options"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="searchhistory",
            options={
                "verbose_name": "Search History",
                "verbose_name_plural": "Search Histories",
            },
        ),
    ]
