from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from multiselectfield import MultiSelectField


class UserManager(BaseUserManager):
    def create_user(self, ID, email, username, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(ID=ID, email=email, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, ID, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(ID, email, username, password)


class User(AbstractBaseUser, PermissionsMixin):
    userID = models.BigAutoField(primary_key=True)
    ID = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'ID'
    REQUIRED_FIELDS = ['email', 'username']

    def __str__(self):
        return self.ID


class UserData(models.Model):
    userID = models.ForeignKey(User, on_delete=models.CASCADE, db_column='userID')
    height = models.IntegerField()
    weight = models.IntegerField()
    shoeType = models.IntegerField()
    Cloth_Choices = {
        ("vintage", "빈티지"), ("retro", "레트로"), ("minimal", "미니멀"),
        ("casual", "캐주얼"), ("street", "스트릿"), ("dandy", "댄디"),
        ("spoty", "스포티"), ("urban", "모던"), ("feminine", "페미닌"), ("classic", "클래식")
    }
    clothType = MultiSelectField(max_length=20, choices=Cloth_Choices)
    Skin_Choices = {
        ("normal", "보통"), ("dry", "건성"), ("oily", "지성"),
        ("sensitive", "민감성"), ("combination", "복합성"), ("acne", "여드름"),
    }
    skinType = MultiSelectField(max_length=20, choices=Skin_Choices)
