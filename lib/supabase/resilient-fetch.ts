import "server-only";

/**
 * Sur une connexion Wi-Fi instable (paquets perdus lors de l'établissement
 * de la connexion TCP/TLS), le système d'exploitation peut mettre 15 à 20
 * secondes avant de déclarer l'échec d'une tentative — bien plus long que
 * ce qu'un utilisateur tolère en cliquant "Enregistrer", et bien plus long
 * que nécessaire pour qu'un retry applicatif (voir lib/cms/actions.ts) ait
 * une vraie chance de retenter au bon moment.
 *
 * Ce fetch borne chaque tentative à `timeoutMs` : au-delà, elle est annulée
 * et échoue immédiatement avec une erreur reconnue comme transitoire par
 * `isTransientNetworkError`, plutôt que de rester bloquée en attendant que
 * l'OS abandonne de son côté. N'affecte jamais le résultat d'une requête qui
 * répond à temps.
 */
export function createResilientFetch(timeoutMs = 8000): typeof fetch {
  return (input, init) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const externalSignal = init?.signal;
    if (externalSignal) {
      if (externalSignal.aborted) controller.abort();
      else externalSignal.addEventListener("abort", () => controller.abort(), { once: true });
    }

    return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
  };
}
