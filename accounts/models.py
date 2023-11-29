from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from multiselectfield import MultiSelectField


class UserManager(BaseUserManager):
    def create_user(self, userID, email, name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            name=name,
            userID=userID,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, userID, email, name, password):
        user = self.create_user(
            userID,
            email,
            name=name,
            password=password,
        )

        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=100,
    )
    name = models.CharField(max_length=30)
    userID = models.CharField(unique=True, max_length=30)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'userID'
    REQUIRED_FIELDS = ['email', 'name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    class Meta:
        db_table = 'user'  # 테이블명을 user로 설정


class UserDataManager(models.Manager):
    pass

class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    shoeType = models.IntegerField(default=0)
    #Cloth_Choices = {
    #    ("vintage", "빈티지"), ("retro", "레트로"), ("minimal", "미니멀"),
    #    ("casual", "캐주얼"), ("street", "스트릿"), ("dandy", "댄디"),
    #    ("spoty", "스포티"), ("urban", "모던"), ("feminine", "페미닌"), ("classic", "클래식")
    #}
    #clothType = MultiSelectField(default="casual", max_length=20, choices=Cloth_Choices)
    #Skin_Choices = {
    #    ("normal", "보통"), ("dry", "건성"), ("oily", "지성"),
    #    ("sensitive", "민감성"), ("combination", "복합성"), ("acne", "여드름"),
    #}
    #skinType = MultiSelectField(default="normal", max_length=20, choices=Skin_Choices)
    clothType = models.JSONField(null=True, blank=True)  # Assuming you want to store an array
    skinType = models.JSONField(null=True, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to="uploads")

    objects = UserDataManager()

    class Meta:
        db_table = 'userdata'
