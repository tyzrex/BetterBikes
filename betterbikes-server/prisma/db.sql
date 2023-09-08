CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table customer(
    customer_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    customername varchar(100) not null,
    password varchar(100) not null,
    email varchar(100) not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    phone_number varchar(100) not null,
    address varchar(100) not null,
    role varchar(100) not null DEFAULT 'customer'
);

CREATE table vehicle_post(
    vehicle_post_id serial primary key,
    customer_id uuid not null,
    vehicle_name varchar(50) not null,
    vehicle_type varchar(50) not null,
    vehicle_brand varchar(50) not null,
    vehicle_year varchar(50) not null,
    vehicle_color varchar(50) not null,
    vehicle_description text not null,
    address varchar(50) not null,
    vehicle_number varchar(50) not null,
    vehicle_listing_type varchar(50) not null,
    vehicle_features varchar(200) not null,
    vehicle_image VARCHAR(100) not null,
    created_at timestamp default now(),
    available boolean default true,
    price_per_day DECIMAL(10,2) not null,
    foreign key (customer_id) references customer(customer_id) on delete cascade
);

CREATE TABLE vehicle_post_comment (
    comment_id SERIAL PRIMARY KEY,
    vehicle_post_id INTEGER NOT NULL,
    customer_id UUID NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    customer_name VARCHAR(100) NOT NULL,
    rating int not null,
    FOREIGN KEY (vehicle_post_id) REFERENCES vehicle_post(vehicle_post_id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
);

create table booking(
    booking_id serial primary key,
    customer_id uuid not null,
    owner_id uuid not null,
    vehicle_post_id int not null,
    total_cost DECIMAL(10,2) not null,
    booking_status varchar(50) not null,
    created_at timestamp default now(),
    start_date varchar(12) not null,
    end_date varchar(12) not null,
    total_price DECIMAL(10,2) not null,
    foreign key (customer_id) references customer(customer_id),
    foreign key (vehicle_post_id) references vehicle_post(vehicle_post_id) on delete cascade
);


create TABLE notifications(
    notification_id SERIAL PRIMARY KEY,
    sender_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    notification_message TEXT NOT NULL,
    foreign key (sender_id) references customer(customer_id),
    foreign key (receiver_id) references customer(customer_id)
);

create table conversation(
    conversation_id uuid primary key default uuid_generate_v4(),
    members uuid[] not null,
    created_at timestamp default now(),
    updated_at timestamp default now()
);


create table vehicle_review(
    vehicle_review_id serial primary key,
    customer_id uuid not null,
    vehicle_post_id int not null,
    review varchar(50) not null,
    rating int not null,
    created_at timestamp default now(),
    foreign key (customer_id) references customer(customer_id),
    foreign key (vehicle_post_id) references vehicle_post(vehicle_post_id)
);

create table message(
    message_id serial primary key,
    conversation_id uuid not null,
    sender_id uuid not null,
    receiver_id uuid not null,
    message varchar(50) not null,
    created_at timestamp default now(),
    foreign key (customer_id) references customer(customer_id),
    FOREIGN KEY (conversation_id) REFERENCES conversation(conversation_id),
    FOREIGN KEY (sender_id) REFERENCES customer(customer_id)
);

create table online_users(
    customer_id uuid primary key,
    customer_name varchar(100) not null,
    socket_id varchar(100) not null,
    last_seen timestamp default now(),  
    foreign key (customer_id) references customer(customer_id)
);