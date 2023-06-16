from django.db import models

# Create your models here.

class Words(models.Model):
    word = models.CharField(max_length=100, unique=True)
    definition = models.CharField(max_length=800) 
    class Meta:
        verbose_name= "Word"
        verbose_name_plural= "Words"

    def __str__(self):
        return self.word
    

class CategoriaImagen(models.Model):
    categoria = models.CharField(max_length=100)
    
    class Meta:
        verbose_name= "Categoria"
        verbose_name_plural= "Categorias"

    def __str__(self):
        return self.categoria


class Images(models.Model):
    name=models.CharField(max_length=100)
    categoria = models.ForeignKey(CategoriaImagen, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    image = models.FileField(upload_to='images')
    class Meta:
        verbose_name= "Image"
        verbose_name_plural= "Images"

    def __str__(self):
        return self.name


