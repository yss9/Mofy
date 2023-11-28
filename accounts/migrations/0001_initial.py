# Generated by Django 4.2.7 on 2023-11-27 21:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=100, verbose_name='email')),
                ('name', models.CharField(max_length=30)),
                ('userID', models.CharField(max_length=30, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('height', models.IntegerField(default=0)),
                ('weight', models.IntegerField(default=0)),
                ('shoeType', models.IntegerField(default=0)),
                ('clothType', multiselectfield.db.fields.MultiSelectField(choices=[('casual', '캐주얼'), ('urban', '모던'), ('minimal', '미니멀'), ('retro', '레트로'), ('spoty', '스포티'), ('classic', '클래식'), ('dandy', '댄디'), ('street', '스트릿'), ('feminine', '페미닌'), ('vintage', '빈티지')], max_length=20)),
                ('skinType', multiselectfield.db.fields.MultiSelectField(choices=[('sensitive', '민감성'), ('acne', '여드름'), ('combination', '복합성'), ('dry', '건성'), ('oily', '지성'), ('normal', '보통')], max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'userdata',
            },
        ),
    ]
