from django.db import models
from django.conf import settings
from django.utils import timezone
from django.urls import reverse
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

User = settings.AUTH_USER_MODEL

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

class Category(models.Model):
    class Meta:
        verbose_name_plural='Categories'
    
    name = models.CharField(max_length=100)

    def __str__(self):
            return self.name


class PostQuerySet(models.QuerySet):
    def search(self, query=None):
        if query is None or query == "":
            return self.none()
        lookups = Q(title__icontains=query) | Q(content__icontains=query | 
        Q(excerpt__icontains=query))
        return self.filter(lookups)


class PostManager(models.Manager):
    def get_queryset(self):
        return PostQuerySet(self.model, using=self._db)

    def search(self, query=None):
        return self.get_queryset().search(query=query)

class Post(models.Model):

    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options=(
        ('draft','Draft'),
        ('published', 'Published'),
    )
    
    category = models.ForeignKey(Category,on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=250)
    image = models.ImageField(_("Image"), upload_to=upload_to, default='posts/default.jpg')
    excerpt = models.TextField(blank=True, null=True)
    content = models.TextField()
    slug = models.SlugField(max_length=250, unique_for_date='published')
    published = models.DateTimeField(default=timezone.now)
    author= models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    status= models.CharField(max_length=10, choices=options, default='publiished')
    active=models.BooleanField(default=True)
    updated = models.DateTimeField(auto_now=True)

    objects = PostManager()
    postobjects = PostObjects()

    class Meta:
        ordering = ('-published',)
    
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('blog:detail', kwargs={'id': self.id})
    
