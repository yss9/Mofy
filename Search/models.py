from django.db import models
import os
from accounts.models import User


class SearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query = models.CharField(max_length=50)
    searched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Search History'
        verbose_name_plural = 'Search Histories'

    def __str__(self):
        return f'{self.user.username} searched {self.query} at {self.searched_at}'
