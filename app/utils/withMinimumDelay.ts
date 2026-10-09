export async function withMinimumDelay<T>(promise: Promise<T>, minimum = 500): Promise<T> {
    const start = performance.now();

    const result = await promise;

    const elapsed = performance.now() - start;
    const remaining = minimum - elapsed;

    if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
    }

    return result;
}
