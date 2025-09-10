type Category = 'yoga' | 'meditation' | 'breathwork'

export function getCategoryColor(category: Category) {
  switch (category) {
    case 'yoga':
      return {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        hover: 'hover:bg-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700'
      }
    case 'meditation':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        hover: 'hover:bg-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700'
      }
    case 'breathwork':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        hover: 'hover:bg-green-200',
        button: 'bg-green-600 hover:bg-green-700'
      }
  }
}
