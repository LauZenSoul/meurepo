# Script Python para substituir nomes e siglas nos ficheiros do projeto
import sys
sys.path.append('/opt/.manus/.sandbox-runtime')
from file_tools import read_file, write_file

def replace_in_file(file_path):
    try:
        # Ler o conteúdo do ficheiro
        content = read_file(file_path)
        if content is None:
            print(f"Erro ao ler o ficheiro: {file_path}")
            return

        original_content = content
        # Realizar as substituições necessárias
        content = content.replace("Instituto Médio Rural Digital de Angola", "Instituto Técnico Digital Rural de Angola")
        content = content.replace("Instituto Médio Rural Digital", "Instituto Técnico Digital Rural de Angola") # Substituir também a versão curta
        content = content.replace("IMRDA", "ITDRA")
        content = content.replace("Universidade Rural Digital", "Universidade Técnica Rural Digital de Angola") # Assumir esta variante para a universidade

        # Escrever o conteúdo modificado de volta se houver alterações
        if content != original_content:
            write_file(file_path, content)
            print(f"Substituições realizadas em: {file_path}")
        else:
            print(f"Não foram necessárias substituições em: {file_path}")

    except Exception as e:
        print(f"Erro ao processar o ficheiro {file_path}: {e}")

# Lista de ficheiros a atualizar
files_to_update = [
    "/home/ubuntu/projeto_instituto_rural_digital/proposta_reformulada.md",
    "/home/ubuntu/projeto_instituto_rural_digital/curriculo_enfermagem.md",
    "/home/ubuntu/projeto_instituto_rural_digital/curriculo_agronomia.md",
    "/home/ubuntu/projeto_instituto_rural_digital/curriculo_administracao_rural.md",
    "/home/ubuntu/projeto_instituto_rural_digital/curriculo_veterinaria.md",
    "/home/ubuntu/projeto_instituto_rural_digital/cursos_adicionais_sugeridos.md",
    "/home/ubuntu/projeto_instituto_rural_digital/adaptacao_modelo_telbanda.md",
    "/home/ubuntu/projeto_instituto_rural_digital/plano_evolucao_universidade.md",
    "/home/ubuntu/projeto_instituto_rural_digital/apresentacao_financiadores.md",
    "/home/ubuntu/projeto_instituto_rural_digital/apresentacao_ministerios.md",
    "/home/ubuntu/projeto_instituto_rural_digital/roteiro_validacao_prototipo.md",
    "/home/ubuntu/projeto_instituto_rural_digital/identidade_visual/conceito_identidade_visual.md",
    "/home/ubuntu/projeto_instituto_rural_digital/arquitetura_plataforma.md",
    "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/index.html",
    "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/documentacao.html",
    "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/sobre.html",
    "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/cursos.html",
    "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/styles.css",
    "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/script.js"
]

# Verificar CSS e JS antes de substituir cegamente
css_path = "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/styles.css"
css_content = read_file(css_path)
if css_content is not None and ("IMRDA" in css_content or "Instituto" in css_content):
     print(f"Potencial referência ao nome encontrada em {css_path} - Verificação manual recomendada.")
     # Remover CSS da lista de atualização automática por precaução
     files_to_update.remove(css_path)
else:
    # Se não houver referências ou erro na leitura, remover da lista
    if css_path in files_to_update:
        files_to_update.remove(css_path)

js_path = "/home/ubuntu/projeto_instituto_rural_digital/site_permanente/script.js"
js_content = read_file(js_path)
if js_content is not None and ("IMRDA" in js_content or "Instituto" in js_content):
     print(f"Referência ao nome encontrada em {js_path} - Realizando substituição.")
     # Manter JS na lista para substituição
else:
    # Se não houver referências ou erro na leitura, remover da lista
    if js_path in files_to_update:
        files_to_update.remove(js_path)

# Processar cada ficheiro na lista
for f in files_to_update:
    replace_in_file(f)

print("Processamento de ficheiros concluído.")

