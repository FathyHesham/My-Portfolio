/* ============================= Start Get Certifications Data From JSON File "data.json" ============================= */
export function renderCertifications(certifications) {
    const container = document.querySelector(".cert-card");
    const fragment = document.createDocumentFragment();

    certifications.forEach(cert => {
        const card = document.createElement("article");
        card.classList.add("cert-content");

        const imgBox = document.createElement("div");
        imgBox.classList.add("cert-img");

        const img = document.createElement("img");
        img.src = cert.image;
        img.alt = cert.alt || cert.title;
        img.loading = "lazy";
        imgBox.appendChild(img);

        const title = document.createElement("h3");
        title.textContent = cert.title;

        const provider = document.createElement("p");
        provider.textContent = `${cert.from} - ${cert.date}`;

        const btn = document.createElement("a");
        btn.href = cert.show_certificate;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
        btn.classList.add("cert-btn");
        btn.textContent = "Show Certificate";

        card.append(imgBox, title, provider, btn);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}
/* ============================= End Get Certifications Data From JSON File "data.json" ============================= */