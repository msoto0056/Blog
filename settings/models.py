from django.db import models

# Create your models here.
class SystemSettings(models.Model):
    
    class Meta:
        verbose_name_plural='Settings'
    
    message  = models.CharField(max_length=32)
    
    def __str__(self):
        return self.message
