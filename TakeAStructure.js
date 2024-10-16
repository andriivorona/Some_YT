/*function Get-ProjectStructure {
  param (
    [string]$path = ".",
    [int]$level = 0
)

  if ($level -ge 2) { return }  # Зупиняємо рекурсію на другому рівні

  $indent = " " * ($level * 4)  # Задає відступ для вкладеності
  $items = Get-ChildItem -Path $path

  foreach ($item in $items) {
    if ($item.PSIsContainer) {
      Write-Host "$indent├── $($item.Name)" -ForegroundColor Green
      Get-ProjectStructure -path $item.FullName -level ($level + 1)  # Рекурсивно обходимо підкаталоги
    } else {
      Write-Host "$indent├── $($item.Name)" -ForegroundColor Yellow
    }
  }
}

Get-ProjectStructure | Out-File -FilePath "project_structure.txt"*/
