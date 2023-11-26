from django.db import models

from accounts.models import User


class SearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query = models.CharField(max_length=50)
    searched_at = models.DateTimeField(auto_now_add=True)