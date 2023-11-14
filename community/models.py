from django.db import models

# Create your models here.

class Board(models.Model):
    boardID = models.AutoField(primary_key = True)
    title = models.TextField()
    content = models.TextField()