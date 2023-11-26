# Generated by Django 4.2.5 on 2023-11-25 17:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_alter_userdata_clothtype_alter_userdata_height_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='clothType',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('dandy', '댄디'), ('retro', '레트로'), ('casual', '캐주얼'), ('spoty', '스포티'), ('feminine', '페미닌'), ('urban', '모던'), ('classic', '클래식'), ('vintage', '빈티지'), ('street', '스트릿'), ('minimal', '미니멀')], max_length=20),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='skinType',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('oily', '지성'), ('dry', '건성'), ('acne', '여드름'), ('sensitive', '민감성'), ('combination', '복합성'), ('normal', '보통')], max_length=20),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]