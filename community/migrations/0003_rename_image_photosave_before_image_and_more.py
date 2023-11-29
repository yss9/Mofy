# Generated by Django 4.2.7 on 2023-11-29 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0002_board_tags'),
    ]

    operations = [
        migrations.RenameField(
            model_name='photosave',
            old_name='image',
            new_name='before_image',
        ),
        migrations.AddField(
            model_name='photosave',
            name='middle_image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads'),
        ),
        migrations.AddField(
            model_name='photosave',
            name='result_image',
            field=models.ImageField(blank=True, null=True, upload_to='uploads'),
        ),
    ]