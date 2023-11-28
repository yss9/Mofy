

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('boardID', models.AutoField(primary_key=True, serialize=False)),
                ('boardType', models.SmallIntegerField()),
                ('title', models.TextField(max_length=50)),
                ('content', models.TextField()),
                ('image', models.TextField()),
                ('datetime', models.DateTimeField(auto_now=True)),
                ('like_num', models.PositiveSmallIntegerField(default=0)),
                ('price', models.BigIntegerField(default=0)),
                ('state', models.BooleanField(default=True)),
                ('address', models.TextField(null=True)),
                ('userID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TagName',
            fields=[
                ('tagID', models.BigAutoField(primary_key=True, serialize=False)),
                ('tagName', models.TextField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='TagBoard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boardID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='community.board')),
                ('tagID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='community.tagname')),
            ],
        ),
        migrations.CreateModel(
            name='StyleRank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateField(auto_now_add=True)),
                ('boardID_1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='boardID_1', to='community.board')),
                ('boardID_2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='boardID_2', to='community.board')),
                ('boardID_3', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='boardID_3', to='community.board')),
            ],
        ),
        migrations.CreateModel(
            name='ReportBoardList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boardID', models.ForeignKey(db_column='boardID', on_delete=django.db.models.deletion.CASCADE, to='community.board')),
                ('userID', models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(max_length=100)),
                ('boardID', models.ForeignKey(db_column='boardID', on_delete=django.db.models.deletion.CASCADE, to='community.board')),
                ('receiveID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiveID', to=settings.AUTH_USER_MODEL)),
                ('sendID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sendID', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('boardID', models.ForeignKey(db_column='boardID', on_delete=django.db.models.deletion.CASCADE, to='community.board')),
                ('userID', models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(max_length=100)),
                ('datetime', models.DateTimeField(auto_now=True)),
                ('boardID', models.ForeignKey(db_column='boardID', on_delete=django.db.models.deletion.CASCADE, to='community.board')),
                ('userID', models.ForeignKey(db_column='userID', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
