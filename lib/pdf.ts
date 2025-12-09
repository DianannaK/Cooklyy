import jsPDF from 'jspdf';
import { Recipe, Ingredient, ShoppingCartItem } from '@/types';

export function generateRecipePDF(recipe: Recipe, servings: number) {
    const doc = new jsPDF();
    const scaleFactor = servings / recipe.servings;

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Cookly', 20, 20);

    // Recipe title
    doc.setFontSize(18);
    doc.text(recipe.title, 20, 35);

    // Recipe info
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Portsud: ${servings} | Aeg: ${recipe.cooking_time} min | Raskusaste: ${recipe.difficulty}`, 20, 45);

    // Description
    doc.setFontSize(11);
    const descLines = doc.splitTextToSize(recipe.description, 170);
    doc.text(descLines, 20, 55);

    // Ingredients
    let yPos = 75;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Koostisosad:', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    recipe.ingredients.forEach((ing) => {
        const scaledAmount = (ing.amount * scaleFactor).toFixed(1);
        doc.text(`• ${scaledAmount} ${ing.unit} ${ing.name}`, 25, yPos);
        yPos += 6;
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
    });

    // Instructions
    yPos += 10;
    if (yPos > 250) {
        doc.addPage();
        yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Valmistamine:', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    recipe.instructions.forEach((step, index) => {
        const stepLines = doc.splitTextToSize(`${index + 1}. ${step}`, 170);
        doc.text(stepLines, 20, yPos);
        yPos += stepLines.length * 6 + 4;
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128);
        doc.text(`Cookly.ee - ${new Date().toLocaleDateString('et-EE')}`, 20, 285);
        doc.text(`Lehekülg ${i} / ${pageCount}`, 170, 285);
    }

    return doc;
}

export function generateShoppingListPDF(items: ShoppingCartItem[]) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Cookly', 20, 20);

    doc.setFontSize(18);
    doc.text('Ostukorv', 20, 35);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Kuupäev: ${new Date().toLocaleDateString('et-EE')}`, 20, 45);

    // Combine all ingredients
    const ingredientMap = new Map<string, { amount: number; unit: string }>();

    items.forEach((item) => {
        const scaleFactor = item.servings / item.recipe.servings;
        item.recipe.ingredients.forEach((ing) => {
            const key = `${ing.name}|${ing.unit}`;
            const existing = ingredientMap.get(key);
            const scaledAmount = ing.amount * scaleFactor;

            if (existing) {
                ingredientMap.set(key, {
                    amount: existing.amount + scaledAmount,
                    unit: ing.unit,
                });
            } else {
                ingredientMap.set(key, {
                    amount: scaledAmount,
                    unit: ing.unit,
                });
            }
        });
    });

    // List recipes
    let yPos = 60;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Retseptid:', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    items.forEach((item) => {
        doc.text(`• ${item.recipe.title} (${item.servings} portsut)`, 25, yPos);
        yPos += 6;
    });

    // List ingredients
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Koostisosad:', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    Array.from(ingredientMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach(([key, value]) => {
            const name = key.split('|')[0];
            const amount = value.amount.toFixed(1);
            doc.text(`☐ ${amount} ${value.unit} ${name}`, 25, yPos);
            yPos += 6;
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
        });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text('Cookly.ee - Head kokkamist!', 20, 285);

    return doc;
}
