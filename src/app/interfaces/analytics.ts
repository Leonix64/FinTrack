// Resumen general de transacciones
export interface GeneralTransactionSummary {
    totalTransactions: number;
    totalAmount: number;
    averageTransaction: number;
}

// Análisis detallado por categoría
export interface CategoryBreakdown {
    name: string;
    color: string;
    count: number;
    total: number;
    average: number;
}

// Estadísticas mensuales agrupadas
export interface MonthlyInsights {
    [month: string]: {
        count: number;
        total: number;
        average: number;
    };
}

// Identificación de patrones clave de gasto
export interface SpendingPatterns {
    mostSpentCategory: {
        id: string;
        amount: number;
    };
    mostFrequentTransaction: {
        description: string;
        count: number;
    };
}

// Comparativa de gasto con la comunidad
export interface UserSpendingComparison {
    userTotal: number;
    percentile: number;
    average: number;
    deviation: number;
}

// Ranking mensual personalizado
export interface MonthlyRanking {
    [month: string]: {
        userTotal: number;
        userRank: number;
        totalSpentInMonth: number;
        ranking: { userId: string; total: number }[];
    };
}

// Métrica de gasto impulsivo
export interface ImpulsiveSpending {
    impulsiveCount: number;
    nonImpulsiveCount: number;
    guiltPercentage: number;
}

// Diversidad de categorías exploradas
export interface CategoryDiversity {
    usedCategories: number;
    totalCategories: number;
    diversityPercentage: number;
    unusedCategories: number;
}
