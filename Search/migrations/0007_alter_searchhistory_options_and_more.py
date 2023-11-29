# Generated by Django 4.2.7 on 2023-11-29 15:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("Search", "0006_rename_search_query_searchhistory_query"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="searchhistory",
            options={},
        ),
        migrations.AlterField(
            model_name="searchhistory",
            name="query",
            field=models.CharField(max_length=255),
        ),
        migrations.AlterUniqueTogether(
            name="searchhistory",
            unique_together={("user", "query")},
        ),
    ]