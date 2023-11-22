# Generated by Django 4.2.5 on 2023-11-22 09:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('SignUp', '0001_initial'),
        ('community', '0002_tag_board_boardtype_board_datetime_board_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SignUp.user'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='userID',
            field=models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to='SignUp.user'),
        ),
        migrations.AlterField(
            model_name='like',
            name='userID',
            field=models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to='SignUp.user'),
        ),
        migrations.AlterField(
            model_name='message',
            name='receiveID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiveID', to='SignUp.user'),
        ),
        migrations.AlterField(
            model_name='message',
            name='sendID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sendID', to='SignUp.user'),
        ),
        migrations.AlterField(
            model_name='reportboardlist',
            name='userID',
            field=models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to='SignUp.user'),
        ),
    ]
