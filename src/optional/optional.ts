/**
 * Null safe representation of any value.
 * Provides methods to check and manipulate stored value in null-safe way.
 * @param <T> - stored value type
 */
export class Optional<T> {

    /**
     * Returns empty optional.
     * Empty optional holds null value.
     * @param <T> - stored value type
     */
    static empty<T>(): Optional<T> {
        return Optional.EMPTY;
    }

    /**
     * Creates instnace of Optional based on provided value.
     * @param value - value to store
     * @param <T> - value type
     */
    public static of<T>(value?: T): Optional<T> {
        if (value !== null && value !== undefined) {
            return new Optional<T>(value);
        } else {
            return Optional.empty<T>();
        }
    }

    private static readonly EMPTY = new Optional(null);

    private constructor(private value: T) {
    }

    public isPresent(): boolean {
        return this.value !== undefined && this.value !== null;
    }

    public get(): T {
        if (this.isPresent()) {
            return this.value;
        } else {
            return null;
        }
    }

    public flatMap<M>(mapper: (value: T) => M): M {
        if (this.isPresent()) {
            return mapper(this.value);
        } else {
            return null;
        }
    }

    public map<M>(mapper: (value: T) => M): Optional<M> {
        return Optional.of(this.flatMap(mapper));
    }

    public orElse(other: T): T {
        return this.orElseGet(() => other);
    }

    public orElseGet(supplier: () => T): T {
        if (this.isPresent()) {
            return this.value;
        } else {
            return supplier();
        }
    }

    public toString(): string {
        const optionalOf = what => `Optional[${what}]`;
        return this
            .map(value => optionalOf('value=' + value))
            .orElse(optionalOf('empty'));
    }

}
