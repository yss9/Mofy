from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser



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
    clothType = models.JSONField(null=True, blank=True)  # Assuming you want to store an array
    skinType = models.JSONField(null=True, blank=True)
    image = models.ImageField(blank=True, null=True, upload_to="uploads")

    objects = UserDataManager()

    class Meta:
        db_table = 'userdata'


class clothTypeManager(models.Manager):
    pass


class clothType(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Simple = models.BooleanField(default=True)
    Modern = models.BooleanField(default=False)
    Feminine = models.BooleanField(default=False)
    Dandy = models.BooleanField(default=False)
    Retro = models.BooleanField(default=False)
    Minimal = models.BooleanField(default=False)
    Casual = models.BooleanField(default=False)
    Street = models.BooleanField(default=False)
    Sporty = models.BooleanField(default=False)
    Urban = models.BooleanField(default=False)
    Classic = models.BooleanField(default=False)

    objects = clothTypeManager()

    class Meta:
        db_table = 'clothtype'


class skinTypeManager(models.Manager):
    pass


class skinType(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    normal = models.BooleanField(default=True)
    dry = models.BooleanField(default=False)
    oily = models.BooleanField(default=False)
    combination = models.BooleanField(default=False)
    sensitive = models.BooleanField(default=False)
    acne = models.BooleanField(default=False)

    objects = skinTypeManager()

    class Meta:
        db_table = 'skintype'

class MessageManager(models.Manager):
    pass


class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    objects = UserDataManager()

    class Meta:
        db_table = 'message'
