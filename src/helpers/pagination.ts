import { Repository, FindConditions, FindManyOptions } from "typeorm";
import { Model } from 'sequelize-typescript'

export async function paginate<T>(
    repository: any,
    options: IPaginationOptions,
    searchOptions?: FindConditions<T> | FindManyOptions<T>
): Promise<Pagination<T>> {
    const page =
        options.page > 0 ? options.page - 1 : options.page < 0 ? 0 : options.page;
    const limit = options.limit;
    const route = options.route;

    delete options.page;
    delete options.limit;
    delete options.route;

    const { count, rows } = await repository.findAndCountAll({

        offset: page * limit,
        limit: limit,
        ...searchOptions,


    });


    const isNext = route && count / limit >= page + 1;
    const isPrevious = route && page > 0;
    const routes = {
        next: isNext ? `${route}?page=${page + 2}&limit=${limit}` : "",
        previous: isPrevious ? `${route}?page=${page}&limit=${limit}` : ""
    };

    return new Pagination(
        rows.map(item => repository.toResponse(item)),
        rows.length,
        count,
        Math.ceil(count / limit),
        routes.next,
        routes.previous
    );
}


export interface IPaginationOptions {
    limit: number;
    page: number;
    route?: string;
}

export class Pagination<PaginationObject> {
    constructor(
        public readonly items: PaginationObject[],
        public readonly itemCount: number,
        public readonly totalItems: number,
        public readonly pageCount: number,
        public readonly next?: string,
        public readonly previous?: string
    ) { }
}