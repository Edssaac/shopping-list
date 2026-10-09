CREATE TABLE `shopping_item` (
	`id` text PRIMARY KEY,
	`list_id` text NOT NULL,
	`name` text NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`bought_quantity` integer DEFAULT 0 NOT NULL,
	`unit_price` integer NOT NULL,
	CONSTRAINT `fk_shopping_item_list_id_shopping_list_id_fk` FOREIGN KEY (`list_id`) REFERENCES `shopping_list`(`id`) ON DELETE CASCADE
);
