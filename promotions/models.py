from django.db import models

# Create your models here.
class Promotions(models.Model):
    
    class Meta:
        verbose_name_plural='Promotions Messages'
    
    message  = models.CharField(max_length=32)
    
    def __str__(self):
        return self.message