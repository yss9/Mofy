<<<<<<< HEAD
# Generated by Django 4.2.7 on 2023-11-27 15:58
=======
# Generated by Django 4.2.5 on 2023-11-27 15:44
>>>>>>> 5bb93e97af65017e5e9121fbba5714e49005511f

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import multiselectfield.db.fields


class Migration(migrations.Migration):
<<<<<<< HEAD
    dependencies = [
        ("accounts", "0002_userdata"),
=======

    dependencies = [
        ('accounts', '0002_userdata'),
>>>>>>> 5bb93e97af65017e5e9121fbba5714e49005511f
    ]

    operations = [
        migrations.AlterField(
<<<<<<< HEAD
            model_name="userdata",
            name="clothType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("feminine", "페미닌"),
                    ("minimal", "미니멀"),
                    ("street", "스트릿"),
                    ("spoty", "스포티"),
                    ("dandy", "댄디"),
                    ("classic", "클래식"),
                    ("vintage", "빈티지"),
                    ("retro", "레트로"),
                    ("casual", "캐주얼"),
                    ("urban", "모던"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="height",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="shoeType",
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="skinType",
            field=multiselectfield.db.fields.MultiSelectField(
                choices=[
                    ("sensitive", "민감성"),
                    ("combination", "복합성"),
                    ("oily", "지성"),
                    ("acne", "여드름"),
                    ("dry", "건성"),
                    ("normal", "보통"),
                ],
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AlterField(
            model_name="userdata",
            name="weight",
=======
            model_name='userdata',
            name='clothType',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('urban', '모던'), ('vintage', '빈티지'), ('feminine', '페미닌'), ('spoty', '스포티'), ('minimal', '미니멀'), ('street', '스트릿'), ('casual', '캐주얼'), ('dandy', '댄디'), ('classic', '클래식'), ('retro', '레트로')], max_length=20),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='height',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='shoeType',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='skinType',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('sensitive', '민감성'), ('normal', '보통'), ('oily', '지성'), ('acne', '여드름'), ('dry', '건성'), ('combination', '복합성')], max_length=20),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userdata',
            name='weight',
>>>>>>> 5bb93e97af65017e5e9121fbba5714e49005511f
            field=models.IntegerField(default=0),
        ),
    ]
