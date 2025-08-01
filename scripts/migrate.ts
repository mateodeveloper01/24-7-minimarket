import { PrismaClient } from "@prisma/client";

(async () => {
  const prisma = new PrismaClient();
  
  try {
    console.log('🚀 Iniciando migración de categorías...');
    
    // Obtener categorías únicas
    const uniqueCategories = await prisma.products.findMany({
      select: {
        category: true
      },
      distinct: ['category']
    });
    
    console.log(`📊 Encontradas ${uniqueCategories.length} categorías únicas`);
    
    // Crear categorías únicas
    let createdCategories = 0;
    for (const categoryData of uniqueCategories) {
      // Verificar si la categoría ya existe
      const existingCategory = await prisma.categoryModel.findFirst({
        where: {
          name: categoryData.category
        }
      });
      
      if (!existingCategory) {
        await prisma.categoryModel.create({
          data: {
            name: categoryData.category
          }
        });
        createdCategories++;
        console.log(`✅ Categoría creada: ${categoryData.category}`);
      } else {
        console.log(`⏭️  Categoría ya existe: ${categoryData.category}`);
      }
    }
    
    console.log(`📈 Categorías creadas: ${createdCategories}`);
    
    // Obtener todos los productos para actualizar (solo campos necesarios)
    const products = await prisma.products.findMany({
      select: {
        id: true,
        category: true,
        categoryModelId: true
      }
    });
    
    console.log(`🔄 Actualizando ${products.length} productos...`);
    
    let updatedProducts = 0;
    let errors = 0;
    let skippedProducts = 0;
    let defaultedToAlmacen = 0;
    
    for (const product of products) {
      try {
        let category = await prisma.categoryModel.findFirst({
          where: {
            name: product.category
          }
        });
        
        // Si no encuentra la categoría, usar 'almacen' como default
        if (!category) {
          console.log(`⚠️  Categoría no encontrada para producto ${product.id}: ${product.category} - Asignando a 'almacen'`);
          category = await prisma.categoryModel.findFirst({
            where: {
              name: 'almacen'
            }
          });
          defaultedToAlmacen++;
        }
        
        // Si aún no encuentra 'almacen', crear la categoría
        if (!category) {
          console.log(`🔧 Creando categoría 'almacen'...`);
          category = await prisma.categoryModel.create({
            data: {
              name: 'almacen'
            }
          });
        }
        
        // Verificar si el producto ya tiene la categoría correcta
        if (product.categoryModelId === category.id) {
          skippedProducts++;
          continue;
        }
        
        await prisma.products.update({
          where: { id: product.id },
          data: {
            categoryModelId: category.id,
          },
        });
        
        updatedProducts++;
        if (updatedProducts % 10 === 0) {
          console.log(`📝 Productos actualizados: ${updatedProducts}/${products.length}`);
        }
      } catch (error) {
        console.error(`❌ Error actualizando producto ${product.id}:`, error);
        errors++;
      }
    }
    
    console.log(`✅ Migración completada:`);
    console.log(`   - Categorías creadas: ${createdCategories}`);
    console.log(`   - Productos actualizados: ${updatedProducts}`);
    console.log(`   - Productos omitidos (ya actualizados): ${skippedProducts}`);
    console.log(`   - Productos asignados a 'almacen': ${defaultedToAlmacen}`);
    console.log(`   - Errores: ${errors}`);
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Conexión cerrada');
  }
})();