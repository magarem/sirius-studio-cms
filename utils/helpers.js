// Função para formatar datas
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Função para capitalizar palavras
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Função para gerar um UUID
export const generateUUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
};

export const generateSlug = (title) => {
    return title
        .toLowerCase()                         // Converte para minúsculas
        .trim()                                // Remove espaços extras no início e no final
        .normalize("NFD")                      // Normaliza para separar caracteres especiais (como acentos)
        .replace(/[\u0300-\u036f]/g, "")       // Remove diacríticos (acentos e similares)
        .replace(/[^a-z0-9\s-]/g, "")          // Remove caracteres especiais, mantendo letras, números, espaços e hífens
        .replace(/\s+/g, "-")                  // Substitui espaços por hífens
        .replace(/-+/g, "-");                  // Remove hífens duplicados
}
