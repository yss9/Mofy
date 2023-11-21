from django.db import models
from django.contrib.auth.models import User
import os


class Post(models.Model):

    tags = models.ManyToManyField(Tag, blank=True)

class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=200, unique=True, allow_unicode=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/blog/tag/{self.slug}/'
