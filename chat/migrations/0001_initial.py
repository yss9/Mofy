# Generated by Django 4.2.7 on 2023-11-27 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ChatRoom",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="ShopUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("shop_user_email", models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="VisitorUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("visitor_user_email", models.EmailField(max_length=254, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("sender_email", models.EmailField(max_length=254)),
                ("text", models.TextField()),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                (
                    "room",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="messages",
                        to="chat.chatroom",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="chatroom",
            name="shop_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="chat.shopuser"
            ),
        ),
        migrations.AddField(
            model_name="chatroom",
            name="visitor_user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="chat.visitoruser"
            ),
        ),
        migrations.AlterUniqueTogether(
            name="chatroom",
            unique_together={("shop_user", "visitor_user")},
        ),
    ]
